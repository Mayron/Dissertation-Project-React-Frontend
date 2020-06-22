import React, { useState } from "react";
import Layout from "../components/layout";
import PostBox from "../components/post-box";
import ToolBar from "../components/index/tool-bar";
import { RouteComponentProps } from "@reach/router";
import Post from "../components/common/post";
import CreatePostPopup from "../components/common/create-post-popup";

const IndexPage: React.FC<RouteComponentProps> = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Layout id="index">
      <PostBox togglePopup={setShowPopup} showPopup={showPopup}>
        <CreatePostPopup togglePopup={setShowPopup} />
      </PostBox>
      <ToolBar />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
    </Layout>
  );
};

export default IndexPage;
