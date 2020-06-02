import React from "react";
import SearchIcon from "../images/search-icon.svg";

interface ISearchBoxProps {
  text: string;
}

const SearchBox: React.FC<ISearchBoxProps> = ({ text }) => {
  return (
    <div className="search-box">
      <img src={SearchIcon} alt="search" />
      <input type="search" placeholder="Search posts" />
    </div>
  );
};

export default SearchBox;
