import axios from "axios";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

function ChatDisplay({ user, clickedUser }) {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const [userMessages, setUserMessages] = useState(null);
  const [clickedUserMessages, setClickedUserMessages] = useState(null);

  const getUserMessages = async () => {
    try {
      const response = await axios.get(
        "https://tinder-casafurix.herokuapp.com/messages",
        {
          params: { userId: userId, correspondingUserId: clickedUserId },
        }
      );
      setUserMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getClickedUserMessages = async () => {
    try {
      const response = await axios.get(
        "https://tinder-casafurix.herokuapp.com/messages",
        {
          params: { userId: clickedUserId, correspondingUserId: userId },
        }
      );
      setClickedUserMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserMessages();
    getClickedUserMessages();
  }, []);

  const messages = [];

  // console.log("userMessages", userMessages);

  userMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  clickedUserMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.first_name;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  return (
    <div>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessages={getUserMessages}
        getClickedUserMessages={getClickedUserMessages}
      />
    </div>
  );
}

export default ChatDisplay;
