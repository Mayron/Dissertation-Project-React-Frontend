import React from "react";
import Banner from "./banner";
import SEO from "./seo";
import MainNav from "./nav-menus/main";
import RecommendationsMenu from "./side-menus/recommendations";
import GroupSideMenu from "./side-menus/group";

import "../styles/site.min.css";
import GroupNav from "./nav-menus/group";

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

        {menuType === "group" && <GroupNav />}

        <div id="pageWrapper">
          <main id={id}>{children}</main>
        </div>

        {!menuType && <RecommendationsMenu />}
        {menuType === "group" && <GroupSideMenu />}

        {/* {sideMenu === "project" && <ProjectSideMenu />} */}
        {/* <footer>©OpenSpark.io {new Date().getFullYear()}</footer> */}
      </div>
    </>
  );
};

export default Layout;
