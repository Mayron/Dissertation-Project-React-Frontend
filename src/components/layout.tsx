import React from "react";
import Banner from "./banner";
import SEO from "./seo";
import MainNav from "./nav-menus/main";
import RecommendationsMenu from "./side-menus/recommendations";
import GroupSideMenu from "./side-menus/group";

import GroupNav from "./nav-menus/group";
import ProjectNav from "./nav-menus/project";

import "../styles/site.min.css";
import ProjectHeader from "./project/project-header";

interface ILayoutProps {
  title?: string; // title of the page
  id: string; // the main id
  collapsed?: boolean;
  menuType?: "group" | "project";
}

const Layout: React.FC<ILayoutProps> = ({ id, title, children, collapsed, menuType }) => {
  return (
    <>
      <SEO title={title} />
      <Banner />
      <div id="app">
        <MainNav collapsed={collapsed} />

        <div className={menuType ? `${menuType}-wrapper` : "page-wrapper"}>
          {menuType === "project" && <ProjectHeader />}
          {menuType === "group" && <GroupNav />}
          {menuType === "project" && <ProjectNav />}

          <main id={id}>{children}</main>
        </div>

        {(!menuType || menuType === "project") && <RecommendationsMenu />}
        {menuType === "group" && <GroupSideMenu />}
        {/* {menuType === "project" && <ProjectSideMenu />} */}
        {/* <footer>©OpenSpark.io {new Date().getFullYear()}</footer> */}
      </div>
    </>
  );
};

export default Layout;
