import React, { useState, useContext, useEffect, createContext } from "react";
import Layout from "../layout";
import { RouteComponentProps, useMatch } from "@reach/router";
import Group from "../group/group";
import { SignalRContext } from "../signalr-provider";
import { invokeApiHub } from "../../utils";
import Loading from "../common/loading";
import { navigateTo } from "gatsby";
import slugify from "slugify";

interface IGroupContext {
  group: IBasicGroupDetailsViewModel;
  groupId: string;
  createRoute: (...args: string[]) => string;
}

export const GroupContext = createContext<IGroupContext>({
  groupId: "",
  group: {
    categoryName: "",
    groupId: "",
    name: "",
    totalMembers: 0,
    visibility: "Private",
    about: "",
  },
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
  const [group, setGroup] = useState<IBasicGroupDetailsViewModel | undefined>(undefined);
  const connection = useContext(SignalRContext);

  const handleApiResponse = (response: IPayloadEvent<IBasicGroupDetailsViewModel>) => {
    const groupName = response.payload?.name;

    if (!slug && groupName) {
      const url = `/g/${groupId}/${slugify(groupName, { lower: true })}`;
      navigateTo(url);
    } else {
      setGroup(response.payload);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!groupId || group) return;

    invokeApiHub<IPayloadEvent<IBasicGroupDetailsViewModel>>(
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
                  createRoute: (...args: string[]) => {
                    let path = "";

                    if (args.length > 0) path = `/${args.join("/")}`;

                    if (slug) {
                      return `/g/${groupId}/${slug}${path}`;
                    } else {
                      return `/g/${groupId}${path}`;
                    }
                  },
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
