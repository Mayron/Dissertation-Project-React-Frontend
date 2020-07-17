import React, { useState, useContext, useEffect, createContext } from "react";
import Layout from "../layout";
import { RouteComponentProps, useMatch } from "@reach/router";
import Group from "../group/group";
import { SignalRContext } from "../signalr-provider";
import api, { getAuthConfig } from "../../api";
import { AuthContext } from "../auth-provider";
import { invokeApiHub } from "../../utils";

interface IGroupContext {
  group?: IBasicGroupDetailsViewModel;
  loading: boolean;
}

export const GroupContext = createContext<IGroupContext>({ loading: true });

const GroupPage: React.FC<RouteComponentProps> = ({ children }) => {
  const match = useMatch("/g/:groupId/*");
  const groupId = match?.groupId as string;

  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<IBasicGroupDetailsViewModel | undefined>(undefined);
  const connection = useContext(SignalRContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const config = await getAuthConfig(token);
      await api.get<IApiResponse>(`/groups/${groupId}`, config).then((response) => {
        if (response.status === 202 && response.data.isValid) {
          invokeApiHub<IBasicGroupDetailsViewModel>(
            connection,
            "Subscribe",
            "FetchGroupCallback",
            (response) => {
              setGroup(response);
              setLoading(false);
            },
            response.data.message,
          );
        }
      });
    })();
  }, [groupId, token]);

  return (
    <Layout id="groupPage" title="Test" collapsed menuType="group">
      <Group.Banner
        name="MayronUI"
        type="group"
        members="1.5k"
        category="Gaming"
        logo="logo.png"
        img="banner.jpg"
      >
        <ul className="social">
          <li>FB Icon here!</li>
        </ul>
      </Group.Banner>
      <GroupContext.Provider value={{ loading, group }}>{children}</GroupContext.Provider>
    </Layout>
  );
};

export default GroupPage;
