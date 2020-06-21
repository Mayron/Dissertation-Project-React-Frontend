import React from "react";
import { navigateTo } from "gatsby";

interface ICardProps {
  description: string;
  url?: string;
}

const Card: React.FC<ICardProps> = ({ description, children, url }) => {
  return (
    <div className="card" onClick={() => url && navigateTo(url)}>
      <header>{children}</header>
      <p>{description}</p>
    </div>
  );
};

export default Card;
