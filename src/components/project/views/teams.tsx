import React from "react";
import { RouteComponentProps } from "@reach/router";
import LinkPanel from "../../common/link-panel";
import { Link, navigate } from "gatsby";
import { Icons } from "../../icons";

interface ITeamPanelProps {
  teamName: string;
  color: string;
  description: string;
  members: number;
}

const TeamPanel: React.FC<ITeamPanelProps> = ({
  teamName,
  members,
  color,
  description,
}) => {
  return (
    <LinkPanel
      url="/p/mayronui-gen6/t/admins/members"
      extraIcon={() => (
        <Icons.Settings
          text="Permissions"
          onClick={() => navigate("/p/mayronui-gen6/t/admins/permissions")}
        />
      )}
      meta={members === 1 ? "1 member" : `${members} members`}
      titleStyle={{
        color,
        fontWeight: 600,
      }}
      title={teamName}
    >
      <div className="spaced row-20">
        <p>{description}</p>
        <Link className="btn-secondary" to="/p/mayronui-gen6/t/admins/members">
          View Members
        </Link>
      </div>
    </LinkPanel>
  );
};

const TeamsView: React.FC<RouteComponentProps> = ({}) => {
  return (
    <section id="project_t">
      <header>
        <h2>Teams</h2>
      </header>
      <TeamPanel
        teamName="Admins"
        color="#F251ED"
        description="Owners of the project and controls teams and moderator permissions."
        members={1}
      />
      <TeamPanel
        teamName="Moderators"
        color="#F25151"
        members={4}
        description="Controls knowledge base, opportunities, and addresses issues raised and forwards to teams."
      />
      <TeamPanel
        teamName="Developers"
        color="#F2A751"
        members={30}
        description="Helps to develop the MayronUI project and attends to any bug fixes."
      />
    </section>
  );
};

export default TeamsView;
