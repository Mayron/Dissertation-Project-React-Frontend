import React from "react";
import Filter from "../filter";
import SearchBox from "../search-box";

const ToolBar = () => {
  return (
    <div id="toolBar" role="toolbar">
      <SearchBox text="Search posts" />
      <div>
        <Filter
          label="Show"
          tooltip="Show posts from"
          selected={1}
          items={["All Posts", "Groups", "Friends", "Subscriptions"]}
        />
        <Filter
          label="Sort by"
          tooltip="Sort by"
          selected={1}
          items={["Popular", "Newest"]}
        />
      </div>
    </div>
  );
};

export default ToolBar;
