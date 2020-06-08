import React from "react";
import { RouteComponentProps } from "@reach/router";
import PostBox from "../../post-box";
import ToolBar from "../../index/tool-bar";
import GroupPost from "../group-post";
import Group from "../group";

const PostsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Group.MenuBars.HomeMenuBar />
      <section id="groupPosts">
        <PostBox />
        <ToolBar />
        <GroupPost />
      </section>
    </>
  );
};

export default PostsView;
