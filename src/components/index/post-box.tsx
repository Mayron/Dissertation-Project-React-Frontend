import React from "react";

// TODO: Replace
import ProfilePic from "../../images/placeholder-profile-pic-lg.png";

const PostBox = () => {
  return (
    <section id="postBox">
      <header>
        <img src={ProfilePic} alt="profile" />
        <p>
          Post as <a className="user">Mike Richards</a>
        </p>
      </header>
      <div>
        <input type="text" placeholder="Start posting..." />
      </div>
    </section>
  );
};

export default PostBox;
