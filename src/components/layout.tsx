import React, { useState, useEffect } from "react";
import Banner from "./banner";
import SEO from "./seo";
import MainNav from "./nav-menus/main";
import RecommendationsMenu from "./side-menus/recommendations";
import GroupSideMenu from "./side-menus/group";
import GroupNav from "./nav-menus/group";
import ProjectNav from "./nav-menus/project";

import "../styles/site.min.css";
import ProjectHeader from "./project/project-header";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { usePendingMessages } from "../utils";

import "semantic-ui-css/components/transition.min.css";
import "semantic-ui-css/components/dropdown.min.css";
import "semantic-ui-css/components/dimmer.min.css";
import "semantic-ui-css/components/loader.min.css";

interface ILayoutProps {
  title?: string; // title of the page
  id: string; // the main id
  collapsed?: boolean;
  menuType?: "group" | "project" | "auth";
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

  useEffect(() => {
    usePendingMessages(localStorage, (p) => {
      if (p.success) {
        toast.success(p.message);
      } else {
        toast.error(p.message);
      }
    });
  }, []);

  return (
    <>
      <SEO title={title} />
      <Banner onBurgerMenuClick={handleBannerBurgerMenuClicked} />
      <div id="__text-resize-handler" />
      <div id="app">
        <MainNav collapsed={isCollapsed} menuType={menuType} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />

        <div className={wrapperClasses.join(" ")}>
          {menuType === "group" && <GroupNav />}
          {menuType === "project" && (
            <>
              <ProjectHeader />
              <ProjectNav />
            </>
          )}

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
