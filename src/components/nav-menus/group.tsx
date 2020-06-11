import React from "react";
import MenuListItem from "./menu-list-item";
import { Icons } from "../icons";
import NavSection from "./nav-section";
import menuData, { ILinkData } from "../../api-data/main-nav-data";

const GroupNav = () => {
  return (
    <nav id="groupNav">
      <ul>
        <MenuListItem url="/g/mayronui-gen6">
          <span>Home</span>
        </MenuListItem>
        <MenuListItem url="/g/mayronui-gen6/announcements">
          <span>Announcements</span>
        </MenuListItem>
        <MenuListItem url="/g/mayronui-gen6/opportunities">
          <span>Opportunities</span>
        </MenuListItem>
        <MenuListItem url="/g/mayronui-gen6/settings" button="secondary">
          <Icons.Settings text="Group Settings" className="btn-secondary" />
        </MenuListItem>
      </ul>
      <NavSection id="projects" title="Projects" items={menuData.projects} more />
      <NavSection id="channels" title="Chat Channels" items={menuData.chatChannels} />
    </nav>
  );
};

export default GroupNav;
