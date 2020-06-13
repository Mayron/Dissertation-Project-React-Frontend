import React from "react";
import { RouteComponentProps } from "@reach/router";
import Group from "../group";
import SearchBox from "../../common/search-box";
import LinkPanel from "../../common/link-panel";
import PostFooter from "../../common/post-footer";
import Filter from "../../common/filter";

const AnnouncementsProjectView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Group.MenuBars.AnnouncementsMenuBar>
        <div className="row-20">
          <Filter
            label="Sort by"
            tooltip="Sort by"
            selected={0}
            items={["Newest", "Oldest"]}
          />
          <SearchBox text="Search announcements" disableAnimation />
        </div>
      </Group.MenuBars.AnnouncementsMenuBar>

      <section id="group_ap">
        <LinkPanel
          title="Future plans for handling module settings."
          headerIcon={() => <p className="panel-label">New</p>}
          highlight
          meta="Project - MayronUI Gen6"
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
        <LinkPanel
          title="New Tutorials available on our official YouTube channel"
          meta="Project - MayronUI Gen6"
          url="/p/mayronui-gen6"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non tellus id
            leo tristique fermentum. Maecenas a orci nec dui porttitor consectetur.
          </p>
          <PostFooter postedBy="Mayron" when="4 months ago" />
        </LinkPanel>
      </section>
    </>
  );
};

export default AnnouncementsProjectView;
