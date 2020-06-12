import React from "react";
import Layout from "../layout";
import { RouteComponentProps } from "@reach/router";
import Project from "../project/project";

interface IProjectPageTemplateProps extends RouteComponentProps {
  slug?: string;
}

const ProjectPage: React.FC<IProjectPageTemplateProps> = ({ slug, children }) => {
  return (
    <Layout id="projectPage" title="Test" collapsed menuType="project">
      <Project.Banner>
        <ul className="social">
          <li>FB Icon here!</li>
        </ul>
      </Project.Banner>
      {children}
    </Layout>
  );
};

export default ProjectPage;
