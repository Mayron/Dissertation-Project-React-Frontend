import React, { useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import Group from "../group/group";
import GroupProvider, { GroupContext } from "../providers/group-provider";

const GroupPageContent: React.FC = ({ children }) => {
  const { group } = useContext(GroupContext);

  return (
    <>
      {!group.groupId ? (
        <h1 className="unavailable">Group unavailable</h1>
      ) : (
        <>
          <Group.Banner group={group} logo="logo.png" img="banner.jpg">
            {/* <ul className="social"></ul> */}
          </Group.Banner>
          {children}
        </>
      )}
    </>
  );
};

const GroupPage: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <GroupProvider>
      <GroupPageContent>{children}</GroupPageContent>
    </GroupProvider>
  );
};

export default GroupPage;
