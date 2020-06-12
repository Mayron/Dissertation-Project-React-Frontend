import React from "react";
import { Icons } from "../icons";

interface IVoteProps {
  value: number;
}

const Vote: React.FC<IVoteProps> = ({ value }) => {
  return (
    <div className="vote">
      <button>
        <Icons.Arrow direction="up" />
      </button>
      <span>{value}</span>
      <button>
        <Icons.Arrow direction="down" />
      </button>
    </div>
  );
};

export default Vote;
