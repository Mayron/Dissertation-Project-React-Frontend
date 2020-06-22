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
  subPage?: string;
}

const Layout: React.FC<ILayoutProps> = ({
  id,
  title,
  children,
  collapsed,
  menuType,
  subPage,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const handleBannerBurgerMenuClicked = () => {
    setIsCollapsed(!isCollapsed);
  };

  const wrapperClasses: string[] = [];

  if (menuType) {
    wrapperClasses.push(`${menuType}-wrapper`);
  } else {
    wrapperClasses.push(`page-wrapper`);
  }

  if (subPage) wrapperClasses.push(subPage);

  return (
    <>
      <SEO title={title} />
      <Banner onBurgerMenuClick={handleBannerBurgerMenuClicked} />
      <div id="__text-resize-handler" />
      <div id="app">
        <MainNav collapsed={isCollapsed} menuType={menuType} />

        <div className={wrapperClasses.join(" ")}>
          {menuType === "project" && <ProjectHeader subPage={subPage} />}
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
