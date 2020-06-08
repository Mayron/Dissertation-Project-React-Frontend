import React from "react";
import { RouteComponentProps } from "@reach/router";
import Panel from "../../common/panel";
import { Icons } from "../../icons";
import Card from "../../common/card";
import Group from "../group";

const AnnouncementsCommunityView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Group.MenuBars.AnnouncementsMenuBar />
      <section id="group_ac"></section>
    </>
  );
};

export default AnnouncementsCommunityView;
