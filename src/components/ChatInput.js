import axios from "axios";
import React, { useState } from "react";

//fetching getUser and getClickedUser messages so as to fetch the older messages as well
function ChatInput({
  user,
  clickedUser,
  getUserMessages,
  getClickedUserMessages,
}) {
  const [textArea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_user_Id: userId,
      to_user_Id: clickedUserId,
      message: textArea,
    };

    try {
      await axios.post("https://tinder-casafurix.herokuapp.com/message", {
        message,
      });
      getUserMessages();
      getClickedUserMessages();
      setTextArea("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='chat-input'>
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className='secondary-button' onClick={addMessage}>
        Submit
      </button>
    </div>
  );
}

export default ChatInput;
