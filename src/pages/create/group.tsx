import React from "react";
import Layout from "../../components/layout";
import { Link } from "gatsby";
import Panel from "../../components/common/panel";
import TextArea from "../../components/widgets/text-area";
import TextField from "../../components/widgets/text-field";
import Dropdown from "../../components/widgets/dropdown";
import ProjectConnectionList from "../../components/project-connection-list";
import PanelSection from "../../components/common/panel-section";
import TagsEditBox from "../../components/widgets/tags-editbox";

const CreateGroupPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
  });

  const handleFormInputChanged = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Layout id="createGroup">
      <Panel title="Create a Group">
        <div className="row">
          <p>
            Once your group reaches over 100 members, it gains the community status.
            Communities gain special benefits.{" "}
            <Link to="/faq/communities">Find out more</Link>.
          </p>
        </div>
        <div className="row">
          <TextField
            title="Group Name"
            placeholder="What should your group be called?"
            required
            max={20}
            name="name"
            value={formValues.name}
            onChange={handleFormInputChanged}
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
        <div className="row">
          <TagsEditBox
            title="Tags"
            max={50}
            placeholder="Tags help users discover your group."
          />
        </div>

        <PanelSection title="Advanced" collapsed>
          <h4 className="row">
            Connect one or more of your existing projects to this group:
          </h4>
          <ProjectConnectionList />
        </PanelSection>
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
