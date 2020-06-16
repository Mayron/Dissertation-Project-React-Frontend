import React from "react";
import { RouteComponentProps } from "@reach/router";
import User from "../user";
import SearchBox from "../../common/search-box";
import Filter from "../../common/filter";
import VotingPost from "../../common/voting-post";

const UserPostsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <User.MenuBars.UserMenuBar />
      <section id="user_p">
        <div className="row spaced">
          <SearchBox text="Search posts" />
          <Filter
            label="Show"
            selected={0}
            items={["All Posts", "My Posts", "Shared Posts", "Saved Posts"]}
          />
        </div>
        <div className="row">
          <VotingPost />
        </div>
        <div className="row">
          <VotingPost shared={{ author: "Mike Richards", when: "4 days ago" }} />
        </div>
      </section>
    </>
  );
};

export default UserPostsView;
