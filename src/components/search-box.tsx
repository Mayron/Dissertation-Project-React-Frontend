import React from "react";
import { Icons } from "./icons";

interface ISearchBoxProps {
  text: string;
}

const SearchBox: React.FC<ISearchBoxProps> = ({ text }) => {
  return (
    <div className="search-box">
      <Icons.Search />
      <input type="search" placeholder={text} />
    </div>
  );
};

export default SearchBox;
