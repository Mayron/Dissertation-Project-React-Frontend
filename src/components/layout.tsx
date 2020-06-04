import React from "react";
import Banner from "./banner";
import SEO from "./seo";
import MainNav from "./main-nav";
import RecommendationsMenu from "./recommendations-menu";

import "../styles/site.min.css";

interface ILayoutProps {
  title?: string; // title of the page
  id: string; // the main id
}

const Layout: React.FC<ILayoutProps> = ({ id, title, children }) => {
  return (
    <>
      <SEO title={title} />
      <Banner />
      <div id="app">
        <MainNav />
        <div id="pageWrapper">
          <main id={id}>{children}</main>
        </div>
        <RecommendationsMenu />
        {/* <footer>©OpenSpark.io {new Date().getFullYear()}</footer> */}
      </div>
    </>
  );
};

export default Layout;
