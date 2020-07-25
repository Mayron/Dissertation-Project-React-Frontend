import React, { useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import Group from "../group";
import PostsArea from "../../posts-area";
import { GroupContext } from "../../providers/group-provider";

const PostsView: React.FC<RouteComponentProps> = () => {
  const { groupId } = useContext(GroupContext);

  return (
    <>
      <Group.MenuBars.HomeMenuBar />
      <section id="groupPosts">
        <PostsArea fetchCommand="FetchGroupPosts" groupId={groupId} />
      </section>
    </>
  );
};

export default PostsView;
