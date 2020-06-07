import React from "react";
import { Icons } from "../icons";

interface IVoteProps {
  value: number;
}

const Vote: React.FC<IVoteProps> = ({ value }) => {
  return (
    <div className="vote">
      <button>
        <Icons.Arrow up />
      </button>
      <span>{value}</span>
      <button>
        <Icons.Arrow />
      </button>
    </div>
  );
};

export default Vote;
