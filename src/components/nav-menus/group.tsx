import React, { useContext, useState, useEffect } from "react";
import MenuListItem from "./menu-list-item";
import { Icons } from "../icons";
import NavSection from "./nav-section";
import _ from "lodash";
import { SignalRContext } from "../signalr-provider";
import { GroupContext } from "../dynamic-pages/group";
import { invokeApiHub } from "../../api";

interface IGroupsNavState {
  projects: MenuData[];
  chatChannels: MenuData[];
}

const GroupNav = () => {
  const connection = useContext(SignalRContext);
  const { groupId } = useContext(GroupContext);

  const [state, setState] = useState<IGroupsNavState>({
    projects: [],
    chatChannels: [],
  });

  useEffect(() => {
    ["Projects", "ChatChannels"].forEach((t) => {
      invokeApiHub<IPayloadEvent<MenuData[]>>(connection, `FetchGroup${t}`, (ev) => {
        setState({ ...state, [_.camelCase(t)]: ev.payload });
      });
    });
  }, [connection]);

  return (
    <nav id="groupNav">
      <ul>
        <MenuListItem url="/g/mayronui-gen6">
          <span>Home</span>
        </MenuListItem>
        <MenuListItem url="/g/mayronui-gen6/announcements">
          <span>Announcements</span>
        </MenuListItem>
        <MenuListItem url="/g/mayronui-gen6/opportunities">
          <span>Opportunities</span>
        </MenuListItem>
        <MenuListItem url="/g/mayronui-gen6/settings" button="secondary">
          <Icons.Settings text="Group Settings" className="btn-secondary" />
        </MenuListItem>
      </ul>
      <NavSection
        id="projects"
        defaultOpen
        linkPrefix="/p"
        title="Projects"
        items={state.projects}
        moreUrl="/g/mayronui-gen6/projects"
        moreText="Show all projects"
      />
      <NavSection
        id="channels"
        linkPrefix={`/g/${groupId}/chat`}
        defaultOpen
        title="Chat Channels"
        items={state.chatChannels}
      />
    </nav>
  );
};

export default GroupNav;
