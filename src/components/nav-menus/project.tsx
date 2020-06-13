import React from "react";
import MenuListItem from "./menu-list-item";
import { Link } from "gatsby";

const ProjectNav = () => {
  const connected = false;
  return (
    <nav id="projectNav">
      {connected ? (
        <button className="btn-secondary">Visit the Community</button>
      ) : (
        <Link to="/p/mayronui-gen6/connect" className="btn-primary lg">
          Connect
        </Link>
      )}

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
        <MenuListItem url="/p/mayronui-gen6/all-downloads">
          <span>All Downloads</span>
        </MenuListItem>
      </ul>
    </nav>
  );
};

export default ProjectNav;
