import React from "react";
import { RouteComponentProps } from "@reach/router";
import Project from "../project";

const TeamSettingsView: React.FC<RouteComponentProps> = ({}) => {
  return (
    <>
      <Project.MenuBars.SettingsMenuBar />
      <section id="project_ts"></section>
    </>
  );
};

export default TeamSettingsView;
