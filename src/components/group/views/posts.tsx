import React from "react";
import { RouteComponentProps } from "@reach/router";
import Group from "../group";
import PostsArea from "../../posts-area";

const PostsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Group.MenuBars.HomeMenuBar />
      <section id="groupPosts">
        <PostsArea fetchCommand="FetchGroupPosts" />
      </section>
    </>
  );
};

export default PostsView;
