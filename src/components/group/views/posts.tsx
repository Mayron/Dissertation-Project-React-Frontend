import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import PostBox from "../../post-box";
import ToolBar from "../../index/tool-bar";
import Group from "../group";
import VotingPost from "../../common/voting-post";
import CreatePostPopup from "../../common/create-post-popup";

const PostsView: React.FC<RouteComponentProps> = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Group.MenuBars.HomeMenuBar />
      <section id="groupPosts">
        <PostBox togglePopup={setShowPopup} showPopup={showPopup}>
          <CreatePostPopup togglePopup={setShowPopup} />
        </PostBox>
        <ToolBar />
        <VotingPost />
      </section>
    </>
  );
};

export default PostsView;
