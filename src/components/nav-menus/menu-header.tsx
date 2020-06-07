import React from "react";
import { Icons } from "../icons";

interface IMenuHeaderProps {
  title: string;
  amount?: number;
}

const MenuHeader: React.FC<IMenuHeaderProps> = ({ title, amount }) => {
  return (
    <header className="menu-header">
      <h3>
        {title} {amount && `(${amount})`}
      </h3>
      <Icons.Arrow />
    </header>
  );
};

export default MenuHeader;
