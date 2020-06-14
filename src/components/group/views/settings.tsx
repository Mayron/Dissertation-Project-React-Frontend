import React from "react";
import { RouteComponentProps } from "@reach/router";
import Group from "../group";

const SettingsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Group.MenuBars.HomeMenuBar />
      <section id="group_s"></section>
    </>
  );
};

export default SettingsView;
