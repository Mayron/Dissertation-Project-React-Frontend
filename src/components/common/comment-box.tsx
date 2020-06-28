import ProfilePic from "../../images/placeholder-profile-pic-lg.png";
import TextareaAutosize from "react-autosize-textarea";
import React from "react";

interface ICommentBoxProps {}

const CommentBox: React.FC<ICommentBoxProps> = ({}) => {
  return (
    <article className="comment-box">
      <header>
        <img src={ProfilePic} alt="profile" />
        <span className="meta">Comment as</span>
        <a className="user">John Smith</a>
      </header>
      <TextareaAutosize placeholder="Any thoughts?" rows={1} maxLength={2000} />
      <footer>
        <button className="btn-primary">Comment</button>
      </footer>
    </article>
  );
};

export default CommentBox;
