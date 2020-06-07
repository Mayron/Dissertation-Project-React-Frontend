import { Link } from "gatsby";
import React from "react";

interface IMenuListItemProps {
  url: string;
  button?: "tertiary" | "secondary" | "primary";
}

const MenuListItem: React.FC<IMenuListItemProps> = ({ url, children, button }) => (
  <li className="menu-item">
    <Link
      to={url}
      className={button ? "btn" : ""}
      activeClassName={button ? "" : "active"}
    >
      {children}
    </Link>
  </li>
);

export default MenuListItem;
