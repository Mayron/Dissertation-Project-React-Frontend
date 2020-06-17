import React from "react";
import Layout from "../../components/layout";
import Panel from "../../components/common/panel";
import { Link } from "gatsby";
import TextField from "../../components/widgets/text-field";
import TextArea from "../../components/widgets/text-area";
import MultiSelectDropdown from "../../components/widgets/multi-select-dropdown";
import TagsEditBox from "../../components/widgets/tags-editbox";

const CreateProjectPage = () => {
  return (
    <Layout id="createProject">
      <Panel title="Create a Project">
        <div className="row">
          <TextField
            title="Project Name"
            placeholder="What should your project be called?"
            required
            max={20}
          />
        </div>
        <div className="row">
          <TextArea
            title="About"
            placeholder="Write a short description about your project. You can always edit this later."
            max={250}
          />
        </div>
        <div className="row">
          <TagsEditBox
            title="Tags"
            max={50}
            placeholder="Tags help users discover your project."
          />
        </div>
        <footer>
          <Link to="/" className="btn-tertiary">
            Back
          </Link>
          <Link to="/p/mayronui-gen6" className="btn-primary">
            Create Project
          </Link>
        </footer>
      </Panel>
    </Layout>
  );
};

export default CreateProjectPage;
