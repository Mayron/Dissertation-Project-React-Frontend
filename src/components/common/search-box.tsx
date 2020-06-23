import React, { useState } from "react";
import { Icons } from "../icons";

interface ISearchBoxProps {
  placeholder: string;
  disableAnimation?: boolean;
}

const SearchBox: React.FC<ISearchBoxProps> = ({ placeholder, disableAnimation }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`search-box${focused ? " focused" : ""}`}>
      <Icons.Search />
      <input
        type="search"
        placeholder={placeholder}
        className={disableAnimation ? "no-anim" : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export default SearchBox;
