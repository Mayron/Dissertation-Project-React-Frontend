import React from "react";
import { Link } from "gatsby";

const AnnouncementsMenuBar: React.FC = ({ children }) => {
  return (
    <nav className="menu-bar" role="toolbar">
      <ul>
        <li>
          <Link to="/g/mayronui-gen6/announcements" activeClassName="active">
            Community
          </Link>
        </li>
        <li>
          <Link to="/g/mayronui-gen6/announcements/projects" activeClassName="active">
            Projects
          </Link>
        </li>
      </ul>
      {children}
    </nav>
  );
};

export default AnnouncementsMenuBar;
