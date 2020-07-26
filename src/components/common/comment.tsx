import React, { useState } from "react";
import { Icons } from "../icons";
import Vote from "./vote";
import CommentReply from "./comment-reply";
import Marked from "marked";

interface ICommentProps {
  votes: number;
  body: string;
}

const Comment: React.FC<ICommentProps> = ({ children, votes, body }) => {
  // const [showReplies, setShowReplies] = useState(true);

  return (
    <article className="comment post">
      <header>
        <Vote value={votes} />
        {children}
      </header>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: Marked.parse(body) }}
      ></div>

      {/* <footer>
        <div>
          <Icons.Arrow text="hide replies" direction={"down"} textDirection={"left"} />
        </div>
        <div className="row-20">
          <Icons.Comment text="reply" />
          <Icons.Save text="save" />
        </div>
      </footer> */}
      {/* {showReplies && <CommentReply></CommentReply>} */}
    </article>
  );
};

export default Comment;
