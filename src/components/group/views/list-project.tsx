import React from "react";
import { RouteComponentProps } from "@reach/router";
import Panel from "../../common/panel";
import { navigateTo } from "gatsby";
import { Icons } from "../../icons";
import Layout from "../../layout";
import ListableProjectsList from "../../listable-projects-list";

interface IWarningProps {
  text: string;
}

const Warning: React.FC<IWarningProps> = ({ text }) => (
  <Panel className="warning">
    <span className="count">!</span>
    <p>{text}</p>
  </Panel>
);

const ListProjectView: React.FC<RouteComponentProps> = () => {
  return (
    <Layout id="group_lp" title="List Project" collapsed menuType="group">
      <Icons.Arrow
        text="Back to Project Categories"
        textDirection="right"
        direction="left"
        className="back-btn row"
        onClick={() => navigateTo("/g/mayronui-gen6/projects")}
      />
      <Warning
        text="This community has a restriction of allowing a maximum of 5 projects to be listed 
          by the same member at any given time. You currently have 5 listed projects and cannot
          list another unless you unlist one first."
      />

      <Panel title="List your projects on the MayronUI group.">
        <ListableProjectsList />

        <footer className="sep">
          <p>Alternatively, you can create and list a new project:</p>
          <button className="btn-secondary">Create Project</button>
        </footer>
      </Panel>
    </Layout>
  );
};

export default ListProjectView;
