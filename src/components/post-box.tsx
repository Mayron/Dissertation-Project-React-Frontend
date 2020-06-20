import React, { useState } from "react";

// TODO: Replace
import ProfilePic from "../images/placeholder-profile-pic-lg.png";

interface IPostBoxProps {
  showPopup?: boolean;
  togglePopup: (showPopup: boolean) => void;
}

const PostBox: React.FC<IPostBoxProps> = ({ children, showPopup, togglePopup }) => {
  return (
    <>
      {showPopup && <div className="fader" onClick={() => togglePopup(false)}></div>}
      <section id="postBox">
        {showPopup && <>{children}</>}
        <header>
          <img src={ProfilePic} alt="profile" />
          <p>
            Post as <a className="user">Mike Richards</a>
          </p>
        </header>
        <button className="btn-create-post" onClick={() => togglePopup(true)}>
          <p className="placeholder">Start posting...</p>
        </button>
      </section>
    </>
  );
};

export default PostBox;
