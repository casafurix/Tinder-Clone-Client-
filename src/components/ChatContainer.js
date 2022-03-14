import React, { useState } from "react";
import ChatHeader from "../components/ChatHeader";
import MatchesDisplay from "../components/MatchesDisplay";
import ChatDisplay from "../components/ChatDisplay";

function ChatContainer({ user }) {
  const [clickedUser, setClickedUser] = useState(null);

  return (
    <div className='chat-container'>
      <ChatHeader user={user} />
      <div>
        <button className='option' onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className='option' disabled={!clickedUser}>
          Chat
        </button>
      </div>

      {/* if there is no clicked user, display list of matches */}
      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}

      {/* whereas, if there is a clicked user, display chat box */}
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
    </div>
  );
}

export default ChatContainer;
