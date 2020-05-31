import React from "react";
import Header from "./header";
import SEO from "./seo";
import MainNav from "./main-nav";
import RightSideMenu from "./right-menu";

import "../styles/site.min.css";

interface ILayoutProps {
  title: string; // title of the page
  id: string; // the main id
}

const Layout: React.FC<ILayoutProps> = ({ id, title, children }) => {
  return (
    <>
      <SEO title={title} />
      <Header />
      <div id="pageWrapper">
        <MainNav />
        <main id={id}>{children}</main>
        <RightSideMenu />
        {/* <footer>©OpenSpark.io {new Date().getFullYear()}</footer> */}
      </div>
    </>
  );
};

export default Layout;
