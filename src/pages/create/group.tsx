import React, { useState, useContext, useEffect } from "react";
import Layout from "../../components/layout";
import { Link, navigateTo } from "gatsby";
import Panel from "../../components/common/panel";
import TextArea from "../../components/widgets/text-area";
import TextField from "../../components/widgets/text-field";
import Dropdown from "../../components/widgets/dropdown";
import PanelSection from "../../components/common/panel-section";
import TagsEditBox from "../../components/widgets/tags-editbox";
import { AuthContext } from "../../components/providers/auth-provider";
import { SignalRContext } from "../../components/providers/signalr-provider";
import { invokeApiHub, postToApi } from "../../api";
import { toast } from "react-toastify";
import Loading from "../../components/common/loading";
import { addPendingMessage } from "../../utils";
import ProjectConnectionList from "../../components/project-connection-list copy";
import _ from "lodash";

declare interface INewGroupModel {
  name: string;
  about?: string;
  categoryId: string;
  tags?: string[];
  connected?: string[];
  visibility: string;
}

interface IFormValuesDefaultState extends FormValues {
  tags: FormValue<ITag[]>;
  connected: FormValue<string[]>;
}

const CreateGroupPage: React.FC = () => {
  const [categories, setCategories] = useState<IKeyValuePair[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const connection = useContext(SignalRContext);

  if (!token) {
    navigateTo("login");
  }

  const [formValues, setFormValues] = useState<IFormValuesDefaultState>({
    name: {},
    about: {},
    categoryId: {},
    visibility: {
      value: "Public",
    },
    tags: {
      value: [],
    },
    connected: {
      value: [],
    },
  });

  useEffect(() => {
    invokeApiHub<IPayloadEvent<IKeyValuePair[]>>(connection, "FetchCategories", (ev) => {
      if (ev.payload) {
        setCategories(ev.payload);
      }
    });
  }, [connection]);

  const handleFormInputChanged = (name: string, value: any) => {
    setFormValues({ ...formValues, [name]: { value } });
  };

  const handleNewGroupSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    if (!connection) {
      toast.error(
        "Lost connection. Please wait and try again when the connection returns.",
      );
      return;
    }

    if (!formValues.name.value) {
      const nextState = { ...formValues };
      nextState.name.error = "Please give your group a name.";
      setFormValues(nextState);
      return;
    }

    if (!formValues.categoryId.value) {
      const nextState = { ...formValues };
      nextState.categoryId.error = "Please select a category.";
      setFormValues(nextState);
      return;
    }

    const group: INewGroupModel = {
      name: formValues.name.value,
      about: formValues.about.value,
      categoryId: formValues.categoryId.value,
      tags: formValues.tags.value?.map((t) => t.value),
      connected: formValues.connected.value,
      visibility: formValues.visibility.value,
    };

    postToApi<GroupCreatedViewModel>(
      connection,
      token,
      "/groups/create",
      group,
      (viewModel) => {
        addPendingMessage(localStorage, {
          success: true,
          message: "Your new group is ready to use!",
        });

        if (viewModel.successfulConnections > 0) {
          addPendingMessage(localStorage, {
            success: true,
            message: `${viewModel.successfulConnections} projects connected to group.`,
          });
        }

        if (viewModel.failedConnections > 0) {
          addPendingMessage(localStorage, {
            success: false,
            message: `${viewModel.failedConnections} projects failed to connect to group. This could be due to visibility restrictions.`,
          });
        }

        navigateTo(`/g/${viewModel.groupId}`);
      },
      () => setLoading(false),
    );

    setLoading(true);
  };

  return (
    <Layout id="createGroup">
      <form onSubmit={handleNewGroupSubmitted}>
        {loading && <Loading dimmer />}
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
              max={40}
              id="groupName"
              name="name"
              data={formValues.name}
              onChange={handleFormInputChanged}
            />
          </div>
          <div className="row gap-20 equal">
            <Dropdown
              title="Visibility"
              placeholder="Select visibility"
              items={[
                { key: "Public", value: "Public" },
                { key: "Unlisted", value: "Unlisted" },
                { key: "Private", value: "Private" },
              ]}
              name="visibility"
              data={formValues.visibility}
              onChange={handleFormInputChanged}
            />
            <Dropdown
              title="Category"
              placeholder="Select category"
              items={categories}
              name="categoryId"
              data={formValues.categoryId}
              onChange={handleFormInputChanged}
            />
          </div>
          <div className="row">
            <TextArea
              title="About"
              placeholder="Write a short description about your group or community. You can always edit this later."
              max={250}
              name="about"
              data={formValues.about}
              onChange={handleFormInputChanged}
            />
          </div>
          <div className="row">
            <TagsEditBox
              title="Tags"
              max={50}
              placeholder="Tags help users discover your group."
              name="tags"
              data={formValues.tags}
              onChange={handleFormInputChanged}
            />
          </div>

          <PanelSection title="Advanced" collapsed>
            <h4 className="row">
              Connect one or more of your existing projects to this group:
            </h4>
            <ProjectConnectionList
              name="connected"
              data={formValues.connected}
              onChange={handleFormInputChanged}
            />
          </PanelSection>
          <footer>
            <Link to="/" className="btn-tertiary">
              Back
            </Link>
            <button type="submit" className="btn-primary">
              Create Group
            </button>
          </footer>
        </Panel>
      </form>
    </Layout>
  );
};

export default CreateGroupPage;
