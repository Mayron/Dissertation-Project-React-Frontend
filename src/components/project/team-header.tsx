import React from "react";
import { RouteComponentProps } from "@reach/router";
import Project from "./project";
import { Icons } from "../icons";
import { navigate } from "gatsby";
import Layout from "../layout";

interface ITeamHeaderProps extends RouteComponentProps {}

const TeamHeader: React.FC<ITeamHeaderProps> = ({ children }) => {
  return (
    <Layout id="projectPage" title="Team" collapsed menuType="project" subPage="team">
      <Icons.Arrow
        text="Back to Teams"
        textDirection="right"
        direction="left"
        className="back-btn"
        onClick={() => navigate("/g/mayronui-gen6/projects")}
      />

      <div></div>
      <Project.MenuBars.TeamsMenuBar />
      {children}
    </Layout>
  );
};

export default TeamHeader;
