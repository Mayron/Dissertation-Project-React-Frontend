import React from "react";
import Layout from "../components/layout";
import PostBox from "../components/index/post-box";
import ToolBar from "../components/index/tool-bar";

const IndexPage: React.FC = () => (
  <Layout id="index" title="Home">
    <PostBox />
    <ToolBar />
  </Layout>
);

export default IndexPage;
