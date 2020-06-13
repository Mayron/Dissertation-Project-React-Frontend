import React from "react";
import { RouteComponentProps } from "@reach/router";
import Project from "../project";
import Filter from "../../common/filter";
import SearchBox from "../../common/search-box";
import { Link } from "gatsby";
import IssuePost from "../issue-post";

interface IIssuesViewProps extends RouteComponentProps {
  closed?: boolean;
}

const IssuesView: React.FC<IIssuesViewProps> = ({ closed }) => {
  return (
    <>
      <Project.MenuBars.IssuesMenuBar>
        <div className="row-20">
          <SearchBox text="Search announcements" disableAnimation />
          <Link to="/p/mayronui-gen6/issues/new" className="btn-secondary btn sm">
            New Issue
          </Link>
        </div>
      </Project.MenuBars.IssuesMenuBar>
      <div className="issues-subbar spaced" role="toolbar">
        <div className="row-20">
          <Filter
            label="Sort by"
            tooltip="Sort by"
            selected={0}
            items={[
              "Newest",
              "Oldest",
              "Highest comments",
              "Lowest comments",
              "Recently updated",
              "Least recently updated",
            ]}
          />
          <Filter label="Mark as" tooltip="Mark selected as" items={["Open", "Closed"]} />
        </div>
        <div className="row-20">
          <Filter label="Label" tooltip="Filter by label" items={["Bug", "Difficult"]} />
          <Filter label="Author" tooltip="Filter by author" items={["Mayron", "Skorm"]} />
          <Filter
            label="Assignee"
            tooltip="Filter by assignee"
            items={["Mayron", "Skorm"]}
          />
        </div>
      </div>
      <section id="project_iss">
        <IssuePost
          author="Mayron"
          when="3 days ago"
          closed={closed && "Closed by Mayron 1 day ago"}
          labels={["Bug"]}
          header={`1# Cannot load the installer without a Lua bug occuring - this is some really really really long title that I need to be aware of`}
        />
        <IssuePost
          author="Kreza"
          when="8 hours ago"
          labels={["Bug", "Performance", "Raid"]}
          header={`2# Game freezes with this UI during raids.`}
          totalComments={3}
        />
      </section>
    </>
  );
};

export default IssuesView;
