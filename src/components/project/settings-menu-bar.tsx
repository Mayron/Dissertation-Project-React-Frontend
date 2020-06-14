import React from "react";
import { Link } from "gatsby";

const SettingsMenuBar: React.FC = ({ children }) => {
  return (
    <nav className="menu-bar" role="toolbar">
      <ul>
        <li>
          <Link to="/p/mayronui-gen6/settings" activeClassName="active">
            General
          </Link>
        </li>
        <li>
          <Link to="/p/mayronui-gen6/settings/teams" activeClassName="active">
            Teams
          </Link>
        </li>
      </ul>
      {children}
    </nav>
  );
};

export default SettingsMenuBar;
