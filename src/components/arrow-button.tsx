import React from "react";
import Arrow from "../images/arrow.inline.svg";

interface IArrowButtonProps {
  active?: boolean;
}

const ArrowButton: React.FC<IArrowButtonProps> = ({ active }) => {
  return (
    <div className={`arrow${active ? " active" : ""}`}>
      <Arrow />
    </div>
  );
};

export default ArrowButton;
