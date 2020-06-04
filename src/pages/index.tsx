import React from "react";
import Layout from "../components/layout";
import PostBox from "../components/index/post-box";
import ToolBar from "../components/index/tool-bar";
import Post from "../components/index/post";

const IndexPage: React.FC = () => (
  <Layout id="index">
    <PostBox />
    <ToolBar />
    <Post />
  </Layout>
);

export default IndexPage;
