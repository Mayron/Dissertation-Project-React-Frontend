import React from "react";
import { Link } from "gatsby";

const UserMenuBar: React.FC = ({ children }) => {
  return (
    <nav className="menu-bar" role="toolbar">
      <ul>
        <li>
          <Link to="/u/mayron" activeClassName="active">
            Posts
          </Link>
        </li>
        <li>
          <Link to="/u/mayron/comments" activeClassName="active">
            Comments
          </Link>
        </li>
        <li>
          <Link to="/u/mayron/memberships" activeClassName="active">
            Memberships
          </Link>
        </li>
        <li>
          <Link to="/u/mayron/subscriptions" activeClassName="active">
            Subscriptions
          </Link>
        </li>
      </ul>
      {children}
    </nav>
  );
};

export default UserMenuBar;
