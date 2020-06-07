import React from "react";
import Layout from "../components/layout";
import { RouteComponentProps } from "@reach/router";

interface IGroupPageTemplateProps extends RouteComponentProps {
  slug?: string;
}

const GroupPageTemplate: React.FC<IGroupPageTemplateProps> = ({ slug }) => {
  return (
    <Layout id="groupPage" title={"Test"} collapsed menuType="group">
      <p>Hello, there! {slug}</p>
    </Layout>
  );
};

export default GroupPageTemplate;
