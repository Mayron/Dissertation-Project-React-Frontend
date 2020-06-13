import React from "react";
import { Icons } from "../icons";

interface ISearchBoxProps {
  text: string;
  disableAnimation?: boolean;
}

const SearchBox: React.FC<ISearchBoxProps> = ({ text, disableAnimation }) => {
  return (
    <div className="search-box">
      <Icons.Search />
      <input type="search" placeholder={text} className={disableAnimation && "no-anim"} />
    </div>
  );
};

export default SearchBox;
