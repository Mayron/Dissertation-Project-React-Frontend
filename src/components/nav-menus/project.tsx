import React from "react";
import MenuListItem from "./menu-list-item";

const ProjectNav = () => {
  return (
    <nav id="projectNav">
      <button className="btn-secondary">Visit the Community</button>
      <ul>
        <MenuListItem url="/p/mayronui-gen6">
          <span>Home</span>
        </MenuListItem>
        <MenuListItem url="/p/mayronui-gen6/announcements">
          <span>Announcements</span>
        </MenuListItem>
        <MenuListItem url="/p/mayronui-gen6/opportunities">
          <span>Opportunities</span>
        </MenuListItem>
        <MenuListItem url="/p/mayronui-gen6/knowledge-base">
          <span>Knowledge Base</span>
        </MenuListItem>
        <MenuListItem url="/p/mayronui-gen6/issues">
          <span>Issues</span>
        </MenuListItem>
        <MenuListItem url="/p/mayronui-gen6/feature-requests">
          <span>Feature Requests</span>
        </MenuListItem>
        <MenuListItem url="/p/mayronui-gen6/all-downloads">
          <span>All Downloads</span>
        </MenuListItem>
      </ul>
    </nav>
  );
};

export default ProjectNav;
