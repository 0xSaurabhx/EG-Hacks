import React from 'react';
import "../styles/style.css"// Import the CSS file

const Chatbox = () => {
  return (
    <div className="chatbox">
      <div className="chatboxsupport">
        <div className="chatboxheader">Chat support!</div>
        <div className="chatboxmessages">
          <div>
            <div className="messagesitem messagesitem--visitor">Hi!</div>
            <div className="messagesitem messagesitem--operator">What is it?</div>
            <div className="messagesitem messagesitem--typing">
              <span className="messagesdot"></span>
              <span className="messagesdot"></span>
              <span className="messagesdot"></span>
            </div>
          </div>
        </div>
        <div className="chatboxfooter">
          <input type="text" placeholder="Write a message" />
        </div>
      </div>
      <div className="chatboxbutton">
        <button>Branch-1</button>
      </div>
    </div>
  );
};

export default Chatbox;