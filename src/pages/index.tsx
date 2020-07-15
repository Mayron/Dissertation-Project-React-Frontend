import React from "react";
import Layout from "../components/layout";
import { RouteComponentProps } from "@reach/router";
import PostsArea from "../components/posts-area";

const IndexPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout id="index">
      <PostsArea fetchCommand="FetchNewsFeed" />
    </Layout>
  );
};

export default IndexPage;
