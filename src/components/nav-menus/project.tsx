import React from "react";
import MenuListItem from "./menu-list-item";
import { Link } from "gatsby";
import { Icons } from "../icons";
import { useMatch } from "@reach/router";
import { createRoute } from "../../utils";

interface IProjectNavProps {
  project: IProjectDetailsViewModel;
}

const ProjectNav: React.FC<IProjectNavProps> = ({ project }) => {
  const connected = project?.connectedGroupId;
  const slugMatch = useMatch("/p/:projectId/:slug/*");
  const slug = slugMatch?.slug;

  return (
    <nav id="projectNav">
      {connected ? (
        <Link to={`/g/${connected}`} className="btn-secondary">
          Visit the Community
        </Link>
      ) : (
        <Link
          to={createRoute("p", project.projectId, slug, "connect")}
          className="btn-primary lg"
        >
          Connect
        </Link>
      )}

      <ul>
        <MenuListItem url={createRoute("p", project.projectId, slug)}>
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
        <MenuListItem url={createRoute("p", project.projectId, slug, "issues")}>
          <span>Issues</span>
        </MenuListItem>
        <MenuListItem url={createRoute("p", project.projectId, slug, "all-downloads")}>
          <span>All Downloads</span>
        </MenuListItem>
        <MenuListItem url={createRoute("p", project.projectId, slug, "teams")}>
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
