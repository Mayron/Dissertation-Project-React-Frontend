import React from "react";
import { Link } from "gatsby";

const IssuesMenuBar: React.FC = ({ children }) => {
  return (
    <nav className="menu-bar" role="toolbar">
      <ul>
        <li>
          <Link to="/p/mayronui-gen6/issues" activeClassName="active">
            Open (3)
          </Link>
        </li>
        <li>
          <Link to="/p/mayronui-gen6/issues/closed" activeClassName="active">
            Closed (1)
          </Link>
        </li>
      </ul>
      {children}
    </nav>
  );
};

export default IssuesMenuBar;
