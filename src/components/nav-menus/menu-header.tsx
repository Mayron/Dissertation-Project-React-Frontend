import React from "react";
import { Icons } from "../icons";

interface IMenuHeaderProps {
  title: string;
  amount?: number;
  open: boolean;
  onClick: () => void;
}

const MenuHeader: React.FC<IMenuHeaderProps> = ({ title, amount, open, onClick }) => {
  return (
    <header className="menu-header">
      <Icons.Arrow open={open} onClick={onClick}>
        <h3>{`${title} ${amount && amount > 0 ? `(${amount})` : ""}`}</h3>
      </Icons.Arrow>
    </header>
  );
};

export default MenuHeader;
