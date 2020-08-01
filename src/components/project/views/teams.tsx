import React, { useEffect, useContext, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import LinkPanel from "../../common/link-panel";
import { Link, navigateTo } from "gatsby";
import { Icons } from "../../icons";
import { invokeApiHub } from "../../../api";
import { SignalRContext } from "../../providers/signalr-provider";
import { ProjectContext } from "../../providers/project-provider.tsx";
import Loading from "../../common/loading";
import { AuthContext } from "../../providers/auth-provider";

interface ITeamPanelProps {
  team: Team;
}

const TeamPanel: React.FC<ITeamPanelProps> = ({ team }) => {
  const { createRoute } = useContext(ProjectContext);

  return (
    <LinkPanel
      url={createRoute("t", team.teamId, "members")}
      extraIcon={() => (
        <Icons.Settings
          text="Permissions"
          onClick={() => navigateTo(createRoute("t", team.teamId, "permissions"))}
        />
      )}
      meta={team.totalMembers === 1 ? "1 member" : `${team.totalMembers} members`}
      titleStyle={{
        color: team.color,
        fontWeight: 600,
      }}
      title={team.name}
    >
      <div className="spaced row-20">
        <p>{team.description}</p>
        <Link className="btn-secondary" to={createRoute("t", team.teamId, "members")}>
          View Members
        </Link>
      </div>
    </LinkPanel>
  );
};

type Team = {
  teamId: string;
  name: string;
  description: string;
  totalMembers: number;
  color: string;
};

const TeamsView: React.FC<RouteComponentProps> = ({}) => {
  const { projectId } = useContext(ProjectContext);
  const connection = useContext(SignalRContext);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    if (!connection || !token) return;

    invokeApiHub<IPayloadEvent<Team[]>>(
      connection,
      "FetchTeams",
      (response) => {
        setLoading(false);
        if (response.payload) {
          setTeams(response.payload);
        }
      },
      () => setLoading(false),
      projectId,
    );
  }, [connection, token]);

  return (
    <section id="project_t">
      <header>
        <h2>Teams</h2>
      </header>
      {loading ? (
        <Loading />
      ) : (
        <>
          {teams.length === 0 && <h2 className="unavailable">Teams unavailable.</h2>}
          {teams.map((team, key) => (
            <TeamPanel key={key} team={team} />
          ))}
        </>
      )}
    </section>
  );
};

export default TeamsView;
