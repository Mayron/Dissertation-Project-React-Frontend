import React, { useState, useContext, useEffect, createContext } from "react";
import { RouteComponentProps, useMatch } from "@reach/router";
import { SignalRContext } from "./signalr-provider";
import { invokeApiHub } from "../../api";
import { routeBuilder } from "../../utils";
import Loading from "../common/loading";
import Layout from "../layout";

interface IGroupContext {
  group: IGroupDetailsViewModel;
  groupId: string;
  createRoute: (...args: string[]) => string;
}

const defaultGroup = {
  about: "",
  name: "",
  visibility: "Private",
  categoryName: "",
  groupId: "",
  totalMembers: 0,
  isMember: false,
};

export const GroupContext = createContext<IGroupContext>({
  groupId: "",
  group: defaultGroup,
  createRoute: (...args) => {
    return "";
  },
});

const GroupProvider: React.FC<RouteComponentProps> = ({ children }) => {
  const groupIdMatch = useMatch("/g/:groupId/*");
  const groupId = groupIdMatch?.groupId as string;

  const [loadingGroup, setLoadingGroup] = useState(true);
  const [group, setGroup] = useState<IGroupDetailsViewModel>({
    ...defaultGroup,
    groupId: groupId,
  });

  const connection = useContext(SignalRContext);

  const handleApiResponse = (response: IPayloadEvent<IGroupDetailsViewModel>) => {
    setGroup(response.payload || defaultGroup);
    setLoadingGroup(false);
  };

  useEffect(() => {
    if (!groupId || !loadingGroup) return;

    invokeApiHub<IPayloadEvent<IGroupDetailsViewModel>>(
      connection,
      "FetchGroup",
      handleApiResponse,
      () => setLoadingGroup(false),
      groupId,
    );
  }, [connection, groupId]);

  return (
    <>
      {loadingGroup ? (
        <Loading />
      ) : (
        <GroupContext.Provider
          value={{
            group,
            groupId,
            createRoute: (...args: string[]) => routeBuilder("g", groupId, ...args),
          }}
        >
          <Layout
            id="groupPage"
            title={group?.name || "Group"}
            collapsed
            menuType="group"
          >
            {children}
          </Layout>
        </GroupContext.Provider>
      )}
    </>
  );
};

export default GroupProvider;
