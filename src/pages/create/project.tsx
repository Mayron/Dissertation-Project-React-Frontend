import React, { useState, useContext } from "react";
import Layout from "../../components/layout";
import Panel from "../../components/common/panel";
import { Link, navigateTo } from "gatsby";
import TextField from "../../components/widgets/text-field";
import TextArea from "../../components/widgets/text-area";
import TagsEditBox from "../../components/widgets/tags-editbox";
import { AuthContext } from "../../components/auth-provider";
import { SignalRContext } from "../../components/signalr-provider";
import { toast } from "react-toastify";
import api, { invokeApiHub, getAuthConfig } from "../../api";
import { addPendingMessage } from "../../utils";
import Loading from "../../components/common/loading";

declare interface INewProjectModel {
  name: string;
  about?: string;
  tags?: string[];
}

interface IFormValuesDefaultState extends FormValues {
  tags: FormValue<ITag[]>;
}

const CreateProjectPage = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const connection = useContext(SignalRContext);

  if (!token) {
    navigateTo("login");
  }

  const [formValues, setFormValues] = useState<IFormValuesDefaultState>({
    name: {},
    about: {},
    tags: {
      value: [],
    },
  });

  const handleFormInputChanged = (name: string, value: any) => {
    setFormValues({ ...formValues, [name]: { value } });
  };

  const handleFormSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
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
      nextState.name.error = "Please give your project a name.";
      setFormValues(nextState);
      return;
    }

    const group: INewProjectModel = {
      name: formValues.name.value,
      about: formValues.about.value,
      tags: formValues.tags.value?.map((t) => t.value),
    };

    (async () => {
      const config = await getAuthConfig(token);
      await api.post<IApiResponse>("/projects/create", group, config).then((response) => {
        if (response.status === 202 && response.data.isValid) {
          invokeApiHub<ISagaMessageEmittedEvent>(
            connection,
            "Subscribe",
            (ev) => {
              const { success, message, args } = ev;
              addPendingMessage(localStorage, { success, message });

              if (args?.projectId) {
                navigateTo(`/p/${args.projectId}`);
              } else {
                navigateTo("/");
              }
            },
            () => {
              setLoading(false);
            },
            response.data.message,
          );
        } else {
          toast.error(response.data.message);
        }
      });
    })();

    setLoading(true);
  };

  return (
    <Layout id="createProject">
      <form onSubmit={handleFormSubmitted}>
        {loading && <Loading dimmer />}
        <Panel title="Create a Project">
          <div className="row">
            <TextField
              title="Project Name"
              placeholder="What should your project be called?"
              required
              max={20}
              name="name"
              data={formValues.name}
              onChange={handleFormInputChanged}
            />
          </div>
          <div className="row">
            <TextArea
              title="About"
              placeholder="Write a short description about your project. You can always edit this later."
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
              placeholder="Tags help users discover your project."
              name="tags"
              data={formValues.tags}
              onChange={handleFormInputChanged}
            />
          </div>
          <footer>
            <Link to="/" className="btn-tertiary">
              Back
            </Link>
            <button type="submit" className="btn-primary">
              Create Project
            </button>
          </footer>
        </Panel>
      </form>
    </Layout>
  );
};

export default CreateProjectPage;
