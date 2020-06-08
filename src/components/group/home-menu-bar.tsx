import React from "react";
// import { Link as ReachLink } from "@reach/router";
import { Link } from "gatsby";

const HomeMenuBar = () => {
  return (
    <nav className="menu-bar" role="toolbar">
      <ul>
        <li>
          <Link to="/g/mayronui-gen6" activeClassName="active">
            Posts
          </Link>
        </li>
        {/* TODO: Activity Feature */}
        {/* <li>
          <Link to="/g/mayronui-gen6/activity" activeClassName="active">
            Activity
          </Link>
        </li> */}
        <li>
          <Link to="/g/mayronui-gen6/about" activeClassName="active">
            About
          </Link>
        </li>
        {/* TODO: Rules Feature */}
        {/* <li>
          <Link to="/g/mayronui-gen6/rules" activeClassName="active">
            Rules
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default HomeMenuBar;
