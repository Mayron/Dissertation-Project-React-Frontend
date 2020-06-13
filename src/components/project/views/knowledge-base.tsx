import React from "react";
import { RouteComponentProps } from "@reach/router";
import SearchBox from "../../common/search-box";
import Project from "../project";
import Filter from "../../common/filter";
import LinkPanel from "../../common/link-panel";
import PostFooter from "../../common/post-footer";

const KnowledgeBaseView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Project.MenuBars.KnowledgeBaseMenuBar>
        <div className="row-20">
          <Filter
            label="Sort by"
            tooltip="Sort by"
            selected={0}
            items={["Popular", "Newest", "Oldest"]}
          />
          <SearchBox text="Search wiki" disableAnimation />
        </div>
      </Project.MenuBars.KnowledgeBaseMenuBar>
      <section id="project_kb">
        <LinkPanel
          title="Future plans for handling module settings."
          url="/p/mayronui-gen6"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non tellus id
            leo tristique fermentum. Maecenas a orci nec dui porttitor consectetur
            interdum id elit. Morbi non velit leo. Fusce interdum purus at vestibulum
            ultricies. Phasellus laoreet tellus in magna sodales ullamcorper. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Vivamus at suscipit lacus.
          </p>
          <PostFooter postedBy="Mayron" when="15 hours ago" />
        </LinkPanel>
      </section>
    </>
  );
};

export default KnowledgeBaseView;
