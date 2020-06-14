import React from "react";
import { RouteComponentProps } from "@reach/router";
import Project from "../project";

const GeneralSettingsView: React.FC<RouteComponentProps> = ({}) => {
  return (
    <>
      <Project.MenuBars.SettingsMenuBar />
      <section id="project_gs"></section>
    </>
  );
};

export default GeneralSettingsView;
