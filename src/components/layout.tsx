import React, { useState } from "react";
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
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const handleBannerBurgerMenuClicked = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <SEO title={title} />
      <Banner onBurgerMenuClick={handleBannerBurgerMenuClicked} />
      <div id="app">
        <MainNav collapsed={isCollapsed} menuType={menuType} />

        <div className={menuType ? `${menuType}-wrapper` : "page-wrapper"}>
          {menuType === "project" && <ProjectHeader />}
          {menuType === "group" && <GroupNav />}
          {menuType === "project" && <ProjectNav />}

          <main id={id}>{children}</main>
        </div>

        {(!menuType || (isCollapsed && menuType === "project")) && (
          <RecommendationsMenu />
        )}
        {isCollapsed && menuType === "group" && <GroupSideMenu />}
        {/* {menuType === "project" && <ProjectSideMenu />} */}
        {/* <footer>©OpenSpark.io {new Date().getFullYear()}</footer> */}
      </div>
    </>
  );
};

export default Layout;
