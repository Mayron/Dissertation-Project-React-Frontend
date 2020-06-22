import React from "react";
import { Link } from "gatsby";

const TeamsMenuBar: React.FC = ({ children }) => {
  return (
    <nav className="menu-bar" role="toolbar">
      <ul>
        <li>
          <Link to="/p/mayronui-gen6/t/admins/members" activeClassName="active">
            Members
          </Link>
        </li>
        <li>
          <Link to="/p/mayronui-gen6/t/admins/permissions" activeClassName="active">
            Permissions
          </Link>
        </li>
      </ul>
      {children}
    </nav>
  );
};

export default TeamsMenuBar;
