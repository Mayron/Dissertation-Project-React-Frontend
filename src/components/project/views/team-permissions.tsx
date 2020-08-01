import React, { useEffect, useContext, useState } from "react";
import { RouteComponentProps, useMatch } from "@reach/router";
import Panel from "../../common/panel";
import { invokeApiHub, postToApi } from "../../../api";
import { SignalRContext } from "../../providers/signalr-provider";
import { AuthContext } from "../../providers/auth-provider";
import Loading from "../../common/loading";
import { toast } from "react-toastify";

interface IPermissionProps {
  name: string;
  description?: string;
  enabled?: boolean;
  onChange: (value: boolean, permission: string) => void;
  permission: string;
}

const Permission: React.FC<IPermissionProps> = ({
  name,
  description,
  enabled,
  onChange,
  permission,
}) => {
  return (
    <div className="perm-container">
      <div>
        <h5>{name}</h5>
        {description && <p className="meta">{description}</p>}
      </div>
      {enabled ? (
        <button className="btn-secondary" onClick={() => onChange(false, permission)}>
          Disable
        </button>
      ) : (
        <button className="btn-primary" onClick={() => onChange(true, permission)}>
          Enable
        </button>
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

  const handlePermissionChanged = (value: boolean, permission: string) => {
    if (!connection || !token) return;

    const data = {
      enabled: value,
      permission,
      teamId,
    };

    postToApi<boolean>(connection, token, "/teams/permission", data, () =>
      toast.success("Permission updated"),
    );

    if (value) {
      setPermissions([...permissions, permission]);
    } else {
      setPermissions(permissions.filter((p) => p != permission));
    }
  };

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
              permission="CanReadChatChannels"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can send chat channel messages"
              enabled={permissions.includes("CanWriteChatChannels")}
              permission="CanWriteChatChannels"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can close issues"
              enabled={permissions.includes("CanCloseIssues")}
              permission="CanCloseIssues"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can edit issue tags"
              enabled={permissions.includes("CanEditIssueTags")}
              permission="CanEditIssueTags"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can upload files"
              enabled={permissions.includes("CanUploadFiles")}
              permission="CanUploadFiles"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can list project on group pages"
              enabled={permissions.includes("CanListProjectOnGroups")}
              permission="CanListProjectOnGroups"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can manage knowledge base"
              enabled={permissions.includes("CanManageKnowledgeBase")}
              permission="CanManageKnowledgeBase"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can manage project pages"
              enabled={permissions.includes("CanManageProjectPages")}
              permission="CanManageProjectPages"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can view team settings"
              enabled={permissions.includes("CanViewTeamSettings")}
              permission="CanViewTeamSettings"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can approve new version files"
              enabled={permissions.includes("CanApproveFiles")}
              permission="CanApproveFiles"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can create new chat channels"
              enabled={permissions.includes("CanCreateChatChannels")}
              permission="CanCreateChatChannels"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can publish opportunities"
              enabled={permissions.includes("CanPublishOpportunities")}
              permission="CanPublishOpportunities"
              onChange={handlePermissionChanged}
            />
            <Permission
              name="Can edit team settings"
              enabled={permissions.includes("CanEditTeamSettings")}
              permission="CanEditTeamSettings"
              onChange={handlePermissionChanged}
            />
          </>
        )}
      </Panel>
    </section>
  );
};

export default TeamPermissionsView;
