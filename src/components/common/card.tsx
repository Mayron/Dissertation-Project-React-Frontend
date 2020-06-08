import React from "react";
import { IIconProps } from "../icons";

interface ICardProps {
  description: string;
}

const Card: React.FC<ICardProps> = ({ description, children }) => {
  return (
    <div className="card">
      <header>{children}</header>
      <p>{description}</p>
    </div>
  );
};

export default Card;
