import React from "react";
import { RouteComponentProps } from "@reach/router";
import OpportunitiesList from "../../opportunities-list";
import OpportunitCategoriesData from "../../../api-data/opportunities-data";

const OpportunitiesView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <section id="project_op">
        <OpportunitiesList categories={OpportunitCategoriesData} shown={[0]} showMeta />
      </section>
    </>
  );
};

export default OpportunitiesView;
