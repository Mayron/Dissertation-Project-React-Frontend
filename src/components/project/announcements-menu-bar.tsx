import React from "react";
import { Link } from "gatsby";

const AnnouncementsMenuBar: React.FC = ({ children }) => {
  return (
    <nav className="menu-bar" role="toolbar">
      <ul>
        <li>
          <Link to="/p/mayronui-gen6/announcements" activeClassName="active">
            Announcements
          </Link>
        </li>
      </ul>
      {children}
    </nav>
  );
};

export default AnnouncementsMenuBar;
