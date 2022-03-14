import React, { useState } from "react";
import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useCookies } from "react-cookie";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const authToken = cookies.AuthToken;

  const handleClick = () => {
    if (authToken) {
      removeCookie("UserId", cookies.UserId);
      removeCookie("AuthToken", cookies.AuthToken);
      window.location.reload();
      return;
    }
    // console.log("Clicked!");
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className='overlay'>
      <Nav
        authToken={authToken}
        minimal={true}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className='home'>
        <h1 className='primary-title'>Swipe Right®</h1>
        <button className='primary-button' onClick={handleClick}>
          {authToken ? "Sign Out" : "Create Account"}
        </button>

        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
}

export default Home;
