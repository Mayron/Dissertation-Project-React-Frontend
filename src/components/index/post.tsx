import React from "react";
import ProfilePic from "../../images/placeholder-profile-pic-lg.png";
import PostFooter from "../common/post-footer";

const Post = () => {
  return (
    <article className="post">
      <header>
        <img src={ProfilePic} alt="profile" />
        <div className="post-user">
          <a className="user">John Smith</a>
          <p>16 hours ago</p>
        </div>
      </header>
      <div className="post-body">
        <h4>This is the Title of this post! Why do they all do it?</h4>
        <div className="post-contents">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque elit
          arcu, et fringilla mauris dignissim sit amet. Maecenas facilisis dignissim erat.
          Praesent faucibus facilisis tortor vel ornare. Sed lacinia eu urna nec
          condimentum. Suspendisse molestie mauris ac ligula molestie malesuada. Duis sed
          tellus ipsum.
        </div>
      </div>
      <PostFooter />
    </article>
  );
};

export default Post;
