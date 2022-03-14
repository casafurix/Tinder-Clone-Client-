import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";

function Dashboard() {
  const [lastDirection, setLastDirection] = useState();
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [genderedUsers, setGenderedUsers] = useState(null);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://tinder-casafurix.herokuapp.com/user",
        {
          params: { userId },
        }
      );
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get(
        "https://tinder-casafurix.herokuapp.com/gendered-users",
        {
          params: { gender: user?.gender_interest },
        }
      );
      setGenderedUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  // console.log("gendered users", genderedUsers);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("https://tinder-casafurix.herokuapp.com/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(user);

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUser) => !matchedUserIds.includes(genderedUser.user_id)
  );

  return (
    <>
      {user && (
        <div className='dashboard'>
          <ChatContainer user={user} />
          <div className='swipe-container'>
            <div className='card-container'>
              {filteredGenderedUsers?.map((genderedUser) => (
                <TinderCard
                  className='swipe'
                  key={genderedUser.user_id}
                  onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                    className='card'
                  >
                    <h3>{genderedUser.first_name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className='swipe-info'>
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
