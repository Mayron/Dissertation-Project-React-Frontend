import React, { useState, useContext, useEffect } from "react";
import Layout from "../../components/layout";
import { Link, navigateTo } from "gatsby";
import Panel from "../../components/common/panel";
import TextArea from "../../components/widgets/text-area";
import TextField from "../../components/widgets/text-field";
import Dropdown from "../../components/widgets/dropdown";
import ProjectConnectionList from "../../components/project-connection-list";
import PanelSection from "../../components/common/panel-section";
import TagsEditBox from "../../components/widgets/tags-editbox";
import { AuthContext } from "../../components/auth-provider";
import { SignalRContext } from "../../components/signalr-provider";
import api, { getAuthConfig } from "../../api";
import { toast } from "react-toastify";
import Loading from "../../components/common/loading";
import { addPendingMessage } from "../../utils";

// hard-coded + checked on server
const groupCategories: IKeyValuePair[] = [
  {
    key: "Gaming",
    value: "gaming",
  },
  {
    key: "Educational",
    value: "educational",
  },
  {
    key: "Entertainment",
    value: "entertainment",
  },
  {
    key: "Politics",
    value: "politics",
  },
  {
    key: "Science & Technology",
    value: "science-tech",
  },
];

declare interface INewGroupModel {
  name: string;
  about?: string;
  categoryId: string;
  tags?: string[];
  ownerUserId: string;
  connected?: string[];
}

interface IFormValuesDefaultState extends FormValues {
  tags: FormValue<string[]>;
  connected: FormValue<string[]>;
}

const CreateGroupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const user = useContext(AuthContext);
  const connection = useContext(SignalRContext);

  const [formValues, setFormValues] = useState<IFormValuesDefaultState>({
    name: {},
    about: {},
    categoryId: {},
    tags: {
      value: [],
    },
    connected: {
      value: [],
    },
  });

  const handleFormInputChanged = (name: string, value: any) => {
    setFormValues({ ...formValues, [name]: { value } });
  };

  const handleNewGroupSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    if (!formValues.name.value) {
      const nextState = { ...formValues };
      nextState.name.error = "Please give your group a name.";
      setFormValues(nextState);
      return;
    }

    if (!formValues.categoryId.value) {
      const nextState = { ...formValues };
      nextState.category.error = "Please select a category.";
      setFormValues(nextState);
      return;
    }

    const group: INewGroupModel = {
      name: formValues.name.value,
      about: formValues.about.value,
      categoryId: formValues.categoryId.value,
      tags: formValues.tags.value,
      ownerUserId: user.id,
      connected: formValues.connected.value,
    };

    (async () => {
      const config = await getAuthConfig();
      await api.post<IApiResponse>("/groups/create", group, config).then((response) => {
        if (response.status === 202 && response.data.isValid) {
          const token = response.data.message;
          connection?.invoke("Subscribe", token, "GroupCreatedCallback");

          connection?.on("GroupCreatedCallback", (event) => {
            const { success, message, args } = event;
            addPendingMessage(localStorage, { success, message });

            if (args?.groupId) {
              navigateTo(`/g/${args.groupId}`);
            } else {
              navigateTo("/");
            }
          });
        } else {
          toast.error(response.data.message);
        }
      });
    })();

    setLoading(true);
  };

  // useEffect(() => {
  //   if (user) {
  //   }
  // }, [user]);

  return (
    <Layout id="createGroup">
      <form onSubmit={handleNewGroupSubmitted}>
        {loading && <Loading />}
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
              id="groupName"
              name="name"
              data={formValues.name}
              onChange={handleFormInputChanged}
            />
            <Dropdown
              title="Category"
              placeholder="Select category"
              items={groupCategories}
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
