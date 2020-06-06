import React from "react";
import Layout from "../../components/layout";
import { Link } from "gatsby";
import Panel from "../../components/common/panel";
import TextArea from "../../components/widgets/text-area";
import TextField from "../../components/widgets/text-field";
import Dropdown from "../../components/widgets/dropdown";
import MultiSelectDropdown from "../../components/widgets/multi-select-dropdown";

const CreateGroupPage: React.FC = () => {
  return (
    <Layout id="createGroup">
      <Panel title="Create a Group">
        <div className="row">
          <TextField
            title="Group Name"
            placeholder="What should your group be called?"
            required
            max={20}
          />
          <Dropdown title="Category" placeholder="Select category" required items={[]} />
        </div>
        <div className="row">
          <TextArea
            title="About"
            placeholder="Write a short description about your group or community. You can always edit this later."
            max={250}
          />
        </div>
        <MultiSelectDropdown
          title="Tags"
          max={50}
          placeholder="Tags help users discover your group."
          items={[]}
        />
        <footer>
          <Link to="/" className="btn-tertiary">
            Back
          </Link>
          <Link to="/g/mayronui-gen6" className="btn-primary">
            Create Group
          </Link>
        </footer>
      </Panel>
    </Layout>
  );
};

export default CreateGroupPage;
