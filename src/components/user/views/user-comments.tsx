import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import User from "../user";
import Filter from "../../common/filter";
import SearchBox from "../../common/search-box";
import { Icons } from "../../icons";
import VotingPost from "../../common/voting-post";
import Vote from "../../common/vote";
import PlaceholderProfilePic from "../../../images/placeholder-profile-pic.jpg";

const CommentHistoryReply: React.FC = () => {
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

const CommentHistory: React.FC = () => {
  const [showReplies, setShowReplies] = useState(true);

  return (
    <article className="comment-history post">
      <header>
        <Vote value={12} />
        <p>
          <a className="user">Mayron</a> left a comment on{" "}
          <a>How to setup MiniMap like in the screenshots?</a> from the{" "}
          <a>MayronUI Community</a>.<span className="meta">3 days ago</span>
        </p>
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
      {showReplies && <CommentHistoryReply></CommentHistoryReply>}
    </article>
  );
};

const UserCommentsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <User.MenuBars.UserMenuBar />
      <section id="user_c">
        <div className="row spaced">
          <SearchBox text="Search comments" />
          <Filter label="Show" selected={0} items={["All Comments", "Saved Comments"]} />
        </div>

        <CommentHistory></CommentHistory>
      </section>
    </>
  );
};

export default UserCommentsView;
