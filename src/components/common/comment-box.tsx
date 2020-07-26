import ProfilePic from "../../images/placeholder-profile-pic.svg";
import TextareaAutosize from "react-autosize-textarea";
import React, { useContext } from "react";
import { AuthContext } from "../providers/auth-provider";

interface ICommentBoxProps {}

const CommentBox: React.FC<ICommentBoxProps> = ({}) => {
  const { appUser, checkingAuthState } = useContext(AuthContext);

  return (
    <article className="comment-box">
      <header>
        <img src={ProfilePic} alt="profile" />
        <span className="meta">Comment as</span>
        <a className="user">{appUser?.displayName}</a>
      </header>
      <TextareaAutosize placeholder="Any thoughts?" rows={1} maxLength={2000} />
      <footer>
        <button className="btn-primary">Comment</button>
      </footer>
    </article>
  );
};

export default CommentBox;
