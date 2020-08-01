import React, { useEffect, useContext, useState } from "react";
import { RouteComponentProps, useMatch } from "@reach/router";
import Panel from "../../common/panel";
import { invokeApiHub } from "../../../api";
import { SignalRContext } from "../../providers/signalr-provider";
import { AuthContext } from "../../providers/auth-provider";
import Loading from "../../common/loading";

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
  const teamIdMatch = useMatch("/p/:projectId/t/:teamId/*");
  const teamId = teamIdMatch?.teamId as string;

  const connection = useContext(SignalRContext);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (!connection || !token) return;

    invokeApiHub<IPayloadEvent<string[]>>(
      connection,
      "FetchTeamPermissions",
      (response) => {
        setLoading(false);
        if (response.payload) {
          setPermissions(response.payload);
        }
      },
      () => setLoading(false),
      teamId,
    );
  }, [connection, token]);

  return (
    <section id="project_tp">
      <Panel title="Permissions for Admin Team">
        {loading ? (
          <Loading dimmer />
        ) : (
          <>
            <Permission
              name="Can read chat channel messages"
              enabled={permissions.includes("CanReadChatChannels")}
            />
            <Permission
              name="Can send chat channel messages"
              enabled={permissions.includes("CanWriteChatChannels")}
            />
            <Permission
              name="Can close issues"
              enabled={permissions.includes("CanCloseIssues")}
            />
            <Permission
              name="Can edit issue tags"
              enabled={permissions.includes("CanEditIssueTags")}
            />
            <Permission
              name="Can upload files"
              enabled={permissions.includes("CanUploadFiles")}
            />
            <Permission
              name="Can list project on group pages"
              enabled={permissions.includes("CanListProjectOnGroups")}
            />
            <Permission
              name="Can manage knowledge base"
              enabled={permissions.includes("CanManageKnowledgeBase")}
            />
            <Permission
              name="Can manage project pages"
              enabled={permissions.includes("CanManageProjectPages")}
            />
            <Permission
              name="Can view team settings"
              enabled={permissions.includes("CanViewTeamSettings")}
            />
            <Permission
              name="Can approve new version files"
              enabled={permissions.includes("CanApproveFiles")}
            />
            <Permission
              name="Can create new chat channels"
              enabled={permissions.includes("CanCreateChatChannels")}
            />
            <Permission
              name="Can publish opportunities"
              enabled={permissions.includes("CanPublishOpportunities")}
            />
            <Permission
              name="Can edit team settings"
              enabled={permissions.includes("CanEditTeamSettings")}
            />
          </>
        )}
      </Panel>
    </section>
  );
};

export default TeamPermissionsView;
