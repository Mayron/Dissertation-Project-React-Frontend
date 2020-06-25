import React from "react";
import { RouteComponentProps } from "@reach/router";
import User from "../user";
import Filter from "../../common/filter";
import SearchBox from "../../common/search-box";
import Comment from "../../common/comment";

const UserCommentsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <User.MenuBars.UserMenuBar />
      <section id="user_c">
        <div className="row spaced">
          <SearchBox placeholder="Search comments" />
          <Filter label="Show" selected={0} items={["All Comments", "Saved Comments"]} />
        </div>

        <Comment>
          <p>
            <a className="user">Mayron</a> left a comment on{" "}
            <a>How to setup MiniMap like in the screenshots?</a> from the{" "}
            <a>MayronUI Community</a>.<span className="meta">3 days ago</span>
          </p>
        </Comment>
      </section>
    </>
  );
};

export default UserCommentsView;
