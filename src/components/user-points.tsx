import React from "react";
import FlameIcon from "../images/flame.svg";

interface IUserPointsProps {
  amount: string;
}

const UserPoints: React.FC<IUserPointsProps> = ({ amount }) => {
  return (
    <div className="user-points">
      <span className="meta">14.6k</span>
      <img src={FlameIcon} alt="points" />
    </div>
  );
};

export default UserPoints;
