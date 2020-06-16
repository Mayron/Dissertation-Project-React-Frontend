import React from "react";
import Layout from "../components/layout";
import PostBox from "../components/post-box";
import ToolBar from "../components/index/tool-bar";
import { RouteComponentProps } from "@reach/router";
import Post from "../components/common/post";

const IndexPage: React.FC<RouteComponentProps> = () => (
  <Layout id="index">
    <PostBox />
    <ToolBar />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
  </Layout>
);

export default IndexPage;
