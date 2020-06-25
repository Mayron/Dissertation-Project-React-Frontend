import React from "react";
import { RouteComponentProps } from "@reach/router";
import Panel from "../../common/panel";
import Dropdown from "../../widgets/dropdown";
import TextArea from "../../widgets/text-area";

const NewIssueView: React.FC<RouteComponentProps> = () => {
  return (
    <section id="project_si">
      <Panel title="Report an Isuse">
        <div className="row">
          <Dropdown
            title="What version are you using?"
            items={[
              {
                key: "1.6",
                value: "1.6",
              },
              {
                key: "2.0 beta",
                value: "2.0 beta",
              },
            ]}
            placeholder="Select version"
          />
        </div>

        <div className="row">
          <TextArea
            placeholder="Describe your issue"
            title="Describe your issue in detail"
            max={1000}
          />
        </div>

        <TextArea
          placeholder="Steps required to replicate the issue"
          title="How can another user replicate this issue?"
          max={1000}
        />

        <footer>
          <button className="btn-tertiary">Back</button>
          <button className="btn-primary">Submit</button>
        </footer>
      </Panel>
    </section>
  );
};

export default NewIssueView;
