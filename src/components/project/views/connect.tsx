import React, { useContext, useState } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import Panel from "../../common/panel";
import GroupConnectionList from "../../group-connection-list";
import { ProjectContext } from "../../dynamic-pages/project";
import api, { getAuthConfig, invokeApiHub } from "../../../api";
import { AuthContext } from "../../auth-provider";
import { SignalRContext } from "../../signalr-provider";
import { addPendingMessage } from "../../../utils";
import { navigateTo } from "gatsby";
import { toast } from "react-toastify";
import Loading from "../../common/loading";

const ConnectView: React.FC<RouteComponentProps> = () => {
  const { projectId, createRoute } = useContext(ProjectContext);
  const { token } = useContext(AuthContext);
  const connection = useContext(SignalRContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [connectedGroupId, setConnectedGroupId] = useState<string | null>(null);

  const handleSelected = (groupId: string | null) => {
    setConnectedGroupId(groupId);
  };

  const handleSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!connectedGroupId) {
      setError("You have not selected a group to connect to.");
      return;
    }

    const postData = {
      projectId: projectId,
      groupId: connectedGroupId,
    };

    (async () => {
      const config = await getAuthConfig(token);
      await api
        .post<IApiResponse>("/projects/connect", postData, config)
        .then((response) => {
          if (response.status === 202 && response.data.isValid) {
            invokeApiHub<ISagaMessageEmittedEvent>(
              connection,
              "Subscribe",
              (ev) => {
                const { success, message } = ev;
                addPendingMessage(localStorage, { success, message });
                navigateTo(createRoute());
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
    <section id="project_c">
      <Panel title="Connect to one of your Groups">
        {loading && <Loading dimmer />}
        <form onSubmit={handleSubmitted}>
          {error && <p className="error">{error}</p>}
          <GroupConnectionList
            value={connectedGroupId}
            onSelect={handleSelected}
            projectId={projectId}
          />
        </form>

        <footer className="sep">
          <p>Alternatively, you can create and connect to a new group:</p>
          <Link className="btn-secondary" to="/create/group">
            Create Group
          </Link>
        </footer>
      </Panel>
    </section>
  );
};

export default ConnectView;
