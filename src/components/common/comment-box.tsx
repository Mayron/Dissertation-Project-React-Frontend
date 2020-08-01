import ProfilePic from "../../images/placeholder-profile-pic.svg";
import TextareaAutosize from "react-autosize-textarea";
import React, { useContext } from "react";
import { AuthContext } from "../providers/auth-provider";
import Loading from "./loading";

interface ICommentBoxProps {
  onSubmitted: () => void;
  onChange: (value: string) => void;
  value: string;
  submitting?: boolean;
}

const CommentBox: React.FC<ICommentBoxProps> = ({
  onSubmitted,
  onChange,
  value,
  submitting,
}) => {
  const { appUser } = useContext(AuthContext);

  return (
    <article className="comment-box">
      <header>
        <img src={ProfilePic} alt="profile" />
        <span className="meta">Comment as</span>
        <a className="user">{appUser?.displayName}</a>
      </header>
      <TextareaAutosize
        placeholder="Any thoughts?"
        rows={1}
        maxLength={2000}
        onChange={(e) => onChange(e.currentTarget.value)}
        value={value}
      />
      <footer>
        {submitting && <Loading size="tiny" inline />}
        <button
          className="btn-primary"
          onClick={onSubmitted}
          disabled={!value || submitting}
        >
          Comment
        </button>
      </footer>
    </article>
  );
};

export default CommentBox;
