import React, { useState } from "react";
import { Icons } from "../icons";
import Vote from "./vote";
import CommentReply from "./comment-reply";

const Comment: React.FC = ({ children }) => {
  const [showReplies, setShowReplies] = useState(true);

  return (
    <article className="comment post">
      <header>
        <Vote value={12} />
        {children}
      </header>
      <p>I agree with everything you just said!</p>
      <footer>
        <div>
          <Icons.Arrow text="hide replies" direction={"down"} textDirection={"left"} />
        </div>
        <div className="row-20">
          <Icons.Comment text="reply" />
          <Icons.Save text="save" />
        </div>
      </footer>
      {showReplies && <CommentReply></CommentReply>}
    </article>
  );
};

export default Comment;
