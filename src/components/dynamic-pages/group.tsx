import React, { useState, useContext, useEffect, createContext } from "react";
import Layout from "../layout";
import { RouteComponentProps, useMatch } from "@reach/router";
import Group from "../group/group";
import { SignalRContext } from "../signalr-provider";
import Loading from "../common/loading";
import { navigateTo } from "gatsby";
import slugify from "slugify";
import { invokeApiHub } from "../../api";
import { createRoute } from "../../utils";

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
};

export const GroupContext = createContext<IGroupContext>({
  groupId: "",
  group: defaultGroup,
  createRoute: (...args) => {
    return "";
  },
});

const GroupPage: React.FC<RouteComponentProps> = ({ children }) => {
  const groupIdMatch = useMatch("/g/:groupId/*");
  const slugMatch = useMatch("/g/:groupId/:slug/*");
  const groupId = groupIdMatch?.groupId as string;
  const slug = slugMatch?.slug;

  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<IGroupDetailsViewModel>({
    ...defaultGroup,
    groupId: groupId,
  });

  const connection = useContext(SignalRContext);

  const handleApiResponse = (response: IPayloadEvent<IGroupDetailsViewModel>) => {
    const groupName = response.payload?.name;

    if (!slug && groupName) {
      const url = `/g/${groupId}/${slugify(groupName, { lower: true })}`;
      navigateTo(url);
    } else {
      setGroup(response.payload || defaultGroup);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!groupId || !loading) return;

    invokeApiHub<IPayloadEvent<IGroupDetailsViewModel>>(
      connection,
      "FetchGroup",
      handleApiResponse,
      () => setLoading(false),
      groupId,
    );
  }, [connection, groupId, slug]);

  return (
    <Layout id="groupPage" title={group?.name || "Group"} collapsed menuType="group">
      {loading && groupId ? (
        <Loading />
      ) : (
        <>
          {!group ? (
            <h1 className="unavailable">Group unavailable</h1>
          ) : (
            <>
              <Group.Banner
                name={group.name}
                type="group"
                members={group.totalMembers}
                category={group.categoryName}
                logo="logo.png"
                img="banner.jpg"
              >
                <ul className="social"></ul>
              </Group.Banner>
              <GroupContext.Provider
                value={{
                  group,
                  groupId,
                  createRoute: (...args: string[]) =>
                    createRoute("g", groupId, slug, ...args),
                }}
              >
                {children}
              </GroupContext.Provider>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default GroupPage;
