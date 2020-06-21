import React from "react";
import { Icons } from "../icons";

interface ISearchBoxProps {
  placeholder: string;
  disableAnimation?: boolean;
}

const SearchBox: React.FC<ISearchBoxProps> = ({ placeholder, disableAnimation }) => {
  return (
    <div className="search-box">
      <Icons.Search />
      <input
        type="search"
        placeholder={placeholder}
        className={disableAnimation ? "no-anim" : undefined}
      />
    </div>
  );
};

export default SearchBox;
