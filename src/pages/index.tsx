import React from "react";
import Layout from "../components/layout";
import PostBox from "../components/post-box";
import ToolBar from "../components/index/tool-bar";
import Post from "../components/index/post";
import { RouteComponentProps } from "@reach/router";

const IndexPage: React.FC<RouteComponentProps> = () => (
  <Layout id="index">
    <PostBox />
    <ToolBar />
    <Post />
  </Layout>
);

export default IndexPage;
