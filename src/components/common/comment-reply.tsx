import React from "react";
import Vote from "./vote";
import { Icons } from "../icons";
import PlaceholderProfilePic from "../../images/placeholder-profile-pic-lg.png";

const CommentReply: React.FC = () => {
  return (
    <article className="reply">
      <header>
        <Vote value={2} />
        <img src={PlaceholderProfilePic} alt="user profile" />
        <a className="user" href="">
          James Newton
        </a>
        <span className="meta">3 days ago</span>
      </header>
      <p>Wrong, you should feed bad for this...</p>
      <footer>
        <div>
          <Icons.Arrow text="show 5 replies" direction={"down"} textDirection={"left"} />
        </div>
        <div className="row-20">
          <Icons.Comment text="reply" />
          <Icons.Save text="save" />
        </div>
      </footer>
    </article>
  );
};

export default CommentReply;
