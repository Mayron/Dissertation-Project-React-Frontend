import React from "react";
import { RouteComponentProps } from "@reach/router";
import Panel from "../../common/panel";

interface IPermissionProps {
  name: string;
  description?: string;
  enabled?: boolean;
}

const Permission: React.FC<IPermissionProps> = ({ name, description, enabled }) => {
  return (
    <div className="perm-container">
      <div>
        <h5>{name}</h5>
        {description && <p className="meta">{description}</p>}
      </div>
      {enabled ? (
        <button className="btn-secondary">Disabled</button>
      ) : (
        <button className="btn-primary">Enable</button>
      )}
    </div>
  );
};

const TeamPermissionsView: React.FC<RouteComponentProps> = () => {
  return (
    <section id="project_tp">
      <Panel title="Permissions for Admin Team">
        <Permission name="Can close issues" />
        <Permission name="Upload new versions of the project" />
        <Permission name="Can approve new versions of the project" enabled />
        <Permission name="Create Chat Channels" enabled />
        <Permission
          name="Can list the project on a community"
          description="Users with this permission can approve and reject community listed projects
                       submitted by members of the community."
        />
      </Panel>
    </section>
  );
};

export default TeamPermissionsView;
