import React from "react";
import Layout from "../components/layout";
import { RouteComponentProps } from "@reach/router";

const BrowsePage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout id="browse" title="Browse">
      <p>Browse Groups and Projects</p>
    </Layout>
  );
};

export default BrowsePage;
