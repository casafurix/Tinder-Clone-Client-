import React from "react";
import whiteLogo from "../images/tinder-white.svg";
import colorLogo from "../images/tinder-color.png";

function Nav({ authToken, minimal, setShowModal, showModal, setIsSignUp }) {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  // const authToken = false;

  return (
    <nav>
      <div className='logo-container'>
        <img
          className='logo'
          src={minimal ? whiteLogo : colorLogo}
          alt='tinder-logo'
        />
      </div>

      {!authToken && minimal && (
        <button
          className='nav-button'
          onClick={handleClick}
          disabled={showModal}
        >
          Log In
        </button>
      )}
    </nav>
  );
}

export default Nav;
