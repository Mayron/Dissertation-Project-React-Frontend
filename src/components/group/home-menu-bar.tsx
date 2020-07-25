import React, { useContext } from "react";
// import { Link as ReachLink } from "@reach/router";
import { Link } from "gatsby";
import { GroupContext } from "../providers/group-provider";

const HomeMenuBar = () => {
  const { createRoute } = useContext(GroupContext);

  return (
    <nav className="menu-bar" role="toolbar">
      <ul>
        <li>
          <Link to={createRoute()} activeClassName="active">
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
          <Link to={createRoute("about")} activeClassName="active">
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
