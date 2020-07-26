import React, { useContext } from "react";
import MenuListItem from "./menu-list-item";
import { Link } from "gatsby";
import { useMatch } from "@reach/router";
import { ProjectContext } from "../providers/project-provider.tsx";

const ProjectNav: React.FC = () => {
  const { project, createRoute } = useContext(ProjectContext);
  const slugMatch = useMatch("/p/:projectId/:slug/*");
  const slug = slugMatch?.slug;

  return (
    <nav id="projectNav">
      {project.connectedGroupId ? (
        <Link to={`/g/${project.connectedGroupId}`} className="btn-secondary">
          Visit the Community
        </Link>
      ) : (
        <Link to={createRoute("connect")} className="btn-primary lg">
          Connect
        </Link>
      )}

      <ul>
        <MenuListItem url={createRoute()}>
          <span>Home</span>
        </MenuListItem>
        {/* <MenuListItem url="/p/mayronui-gen6/announcements">
          <span>Announcements</span>
        </MenuListItem> */}
        {/* <MenuListItem url="/p/mayronui-gen6/opportunities">
          <span>Opportunities</span>
        </MenuListItem> */}
        {/* <MenuListItem url="/p/mayronui-gen6/knowledge-base">
          <span>Knowledge Base</span>
        </MenuListItem> */}
        <MenuListItem url={createRoute("issues")}>
          <span>Issues</span>
        </MenuListItem>
        {/* <MenuListItem url={createRoute("all-downloads")}>
          <span>All Downloads</span>
        </MenuListItem> */}
        <MenuListItem url={createRoute("teams")}>
          <span>Teams</span>
        </MenuListItem>
        {/* <MenuListItem url="/p/mayronui-gen6/settings" button="secondary">
          <Icons.Settings text="Project Settings" className="btn-secondary" />
        </MenuListItem> */}
      </ul>
    </nav>
  );
};

export default ProjectNav;
