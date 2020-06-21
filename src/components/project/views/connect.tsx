import React from "react";
import { RouteComponentProps } from "@reach/router";
import Panel from "../../common/panel";
import { Icons } from "../../icons";
import ProjectConnectionList from "../../project-connection-list";

const ConnectView: React.FC<RouteComponentProps> = () => {
  return (
    <section id="project_c">
      <Panel title="Connect to one of your Groups or Communities">
        <ProjectConnectionList />

        <footer className="sep">
          <p>Alternatively, you can create and connect to a new group:</p>
          <button className="btn-secondary">Create Group</button>
        </footer>
      </Panel>
    </section>
  );
};

export default ConnectView;
