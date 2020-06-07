import React from "react";
import { RouteComponentProps } from "@reach/router";
import PostBox from "../post-box";
import ToolBar from "../index/tool-bar";
import GroupPost from "./group-post";

const PostsSection: React.FC<RouteComponentProps> = () => {
  return (
    <section id="groupPosts">
      <PostBox />
      <ToolBar />
      <GroupPost />
    </section>
  );
};

export default PostsSection;
