import React from "react";
import Layout from "../layout";
import { RouteComponentProps } from "@reach/router";

interface IProjectPageTemplateProps extends RouteComponentProps {
  slug?: string;
}

const ProjectPage: React.FC<IProjectPageTemplateProps> = ({ slug, children }) => {
  return (
    <Layout id="projectPage" title="Test" collapsed menuType="project">
      {children}
    </Layout>
  );
};

export default ProjectPage;
