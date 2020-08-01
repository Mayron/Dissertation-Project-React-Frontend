import React, { useContext, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { AuthContext } from "../../providers/auth-provider";
import { SignalRContext } from "../../providers/signalr-provider";
import { ProjectContext } from "../../providers/project-provider.tsx";
import { toast } from "react-toastify";
import Loading from "../../common/loading";
import Panel from "../../common/panel";
import TextField from "../../widgets/text-field";
import TextArea from "../../widgets/text-area";
import { TwitterPicker } from "react-color";
import { Link, navigateTo } from "gatsby";
import { postToApi } from "../../../api";
import { addPendingMessage } from "../../../utils";

const CreateTeamView: React.FC<RouteComponentProps> = ({}) => {
  const { token } = useContext(AuthContext);
  const connection = useContext(SignalRContext);
  const { projectId, createRoute } = useContext(ProjectContext);

  const [submitting, setSubmitting] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    name: {},
    description: {},
    color: {
      value: "#212121",
    },
  });

  const handleFormInputChanged = (name: string, value: any) => {
    setFormValues({ ...formValues, [name]: { value } });
  };

  const handleCreateTeamSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
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
      nextState.name.error = "Please give your team a name.";
      setFormValues(nextState);
      return;
    }

    const team = {
      name: formValues.name.value,
      description: formValues.description.value,
      color: formValues.color.value,
      projectId: projectId,
    };

    debugger;

    postToApi<string>(
      connection,
      token,
      "/teams/create",
      team,
      (teamId) => {
        addPendingMessage(localStorage, {
          success: true,
          message: "New team created",
        });

        navigateTo(createRoute("t", teamId, "permissions"));
      },
      () => setSubmitting(false),
    );

    setSubmitting(true);
  };

  return (
    <section id="project_ct">
      <form onSubmit={handleCreateTeamSubmitted}>
        <Panel title="Create a Team">
          {submitting && <Loading dimmer />}
          <div className="row gap-20">
            <TextField
              title="Team Name"
              placeholder="What should your team be called?"
              required
              max={40}
              id="teamName"
              name="name"
              data={formValues.name}
              onChange={handleFormInputChanged}
            />

            <div className="field">
              <header>
                <h4>Team Color</h4>
              </header>

              <div></div>
              <div className="color-picker">
                <button
                  className="color"
                  style={{ backgroundColor: formValues.color.value }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                ></button>
                {showColorPicker && (
                  <TwitterPicker
                    color={formValues.color.value}
                    onChangeComplete={(c) => {
                      handleFormInputChanged("color", c.hex);
                      setShowColorPicker(false);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <TextArea
              title="Description (Optional)"
              placeholder="Give your new team a short description. You can always edit this later."
              max={250}
              name="description"
              data={formValues.description}
              onChange={handleFormInputChanged}
            />
          </div>
          <footer>
            <Link to={createRoute("teams")} className="btn-tertiary">
              Back
            </Link>
            <button type="submit" className="btn-primary">
              Create Team
            </button>
          </footer>
        </Panel>
      </form>
    </section>
  );
};

export default CreateTeamView;
