import React, { useContext, useState } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import Panel from "../../common/panel";
import GroupConnectionList from "../../group-connection-list";
import { postToApi } from "../../../api";
import { AuthContext } from "../../providers/auth-provider";
import { SignalRContext } from "../../providers/signalr-provider";
import { addPendingMessage } from "../../../utils";
import { navigateTo } from "gatsby";
import Loading from "../../common/loading";
import { ProjectContext } from "../../providers/project-provider.tsx";
import { toast } from "react-toastify";

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

    if (!connection || !token) return;

    if (!connectedGroupId) {
      setError("You have not selected a group to connect to.");
      return;
    }

    const postData = {
      projectId: projectId,
      groupId: connectedGroupId,
    };

    postToApi<string>(
      connection,
      token,
      "/projects/connect",
      postData,
      (message) => {
        toast.success(message);
        setLoading(false);
      },
      () => setLoading(false),
    );

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
