import React from "react";
import { RouteComponentProps } from "@reach/router";
import PostBox from "../../post-box";
import ToolBar from "../../index/tool-bar";
import Group from "../group";
import VotingPost from "../../common/voting-post";

const PostsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Group.MenuBars.HomeMenuBar />
      <section id="groupPosts">
        <PostBox />
        <ToolBar />
        <VotingPost />
      </section>
    </>
  );
};

export default PostsView;
