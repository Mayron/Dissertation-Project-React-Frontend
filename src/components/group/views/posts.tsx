import React from "react";
import { RouteComponentProps } from "@reach/router";
import Group from "../group";
import PostsArea from "../../posts-area";

interface IPostsViewProps extends RouteComponentProps {
  groupId?: string;
}

const PostsView: React.FC<IPostsViewProps> = ({ groupId }) => {
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
