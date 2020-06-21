import { Link } from "gatsby";
import React from "react";

interface IMenuListItemProps {
  url?: string;
  onClick?: () => void;
  button?: "tertiary" | "secondary" | "primary";
}

const MenuListItem: React.FC<IMenuListItemProps> = ({
  url,
  onClick,
  children,
  button,
}) => (
  <li className="menu-item">
    {url && (
      <Link
        to={url}
        className={button ? "btn" : ""}
        activeClassName={button ? "" : "active"}
      >
        {children}
      </Link>
    )}
    {onClick && (
      <button type="button" className={button ? "btn" : ""} onClick={onClick}>
        {children}
      </button>
    )}
  </li>
);

export default MenuListItem;
