import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import SearchBox from "../../common/search-box";
import Filter from "../../common/filter";
import OpportunitiesList from "../../opportunities-list";
import OpportunitCategoriesData from "../../../api-data/opportunities-data";

const OpportunitiesView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <div className="spaced row">
        <SearchBox text="Search opportunities" />
        <Filter
          label="Filter by"
          tooltip="Filter by"
          selected={0}
          items={["All Projects", "Featured Only", "User Submitted"]}
        />
      </div>
      <section id="group_op">
        <OpportunitiesList categories={OpportunitCategoriesData} shown={[0]} />
      </section>
    </>
  );
};

export default OpportunitiesView;
