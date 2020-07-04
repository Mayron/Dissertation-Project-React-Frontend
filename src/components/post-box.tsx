import React, { useState } from "react";

// TODO: Replace
import ProfilePic from "../images/placeholder-profile-pic.svg";
import { Link } from "gatsby";

interface IPostBoxProps {
  displayName?: string;
  showPopup?: boolean;
  togglePopup: (showPopup: boolean) => void;
}

const PostBox: React.FC<IPostBoxProps> = ({
  displayName,
  children,
  showPopup,
  togglePopup,
}) => {
  return (
    <>
      {showPopup && <div className="fader" onClick={() => togglePopup(false)}></div>}
      <section id="postBox">
        {showPopup && <>{children}</>}
        {displayName ? (
          <>
            <header>
              <img src={ProfilePic} alt="profile" />
              <p>
                Post as <a className="user">{displayName}</a>
              </p>
            </header>
            <button className="btn-create-post" onClick={() => togglePopup(true)}>
              <p className="placeholder">Start posting...</p>
            </button>
          </>
        ) : (
          <Link to="/login" className="link">
            You must be signed in to post.
          </Link>
        )}
      </section>
    </>
  );
};

export default PostBox;
