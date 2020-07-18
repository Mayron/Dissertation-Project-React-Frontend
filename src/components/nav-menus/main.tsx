import React, { useEffect, useState, useContext } from "react";
import { Icons } from "../icons";
import menuData, { ILinkData } from "../../api-data/main-nav-data";
import MenuListItem from "./menu-list-item";
import NavSection from "./nav-section";
import { SignalRContext } from "../signalr-provider";
import { invokeApiHub } from "../../utils";
import { AuthContext } from "../auth-provider";

interface IMainNavProps {
  collapsed?: boolean;
  menuType?: "group" | "project" | "auth";
}

declare interface IMainNavState {
  projects: MenuData[];
  groups: MenuData[];
  memberships: MenuData[];
  subscriptions: MenuData[];
}

const MainNav: React.FC<IMainNavProps> = ({ collapsed, menuType }) => {
  const connection = useContext(SignalRContext);
  const { token } = useContext(AuthContext);

  const [state, setState] = useState<IMainNavState>({
    projects: [],
    groups: [],
    memberships: [],
    subscriptions: [],
  });

  useEffect(() => {
    if (!token) return;

    ["Projects", "Groups", "Memberships", "Subscriptions"].forEach((t) => {
      invokeApiHub<IPayloadEvent<MenuData[]>>(connection, `FetchUser${t}`, (ev) => {
        setState({ ...state, [t.toLowerCase()]: ev.payload });
      });
    });
  }, [connection, token]);

  let classList = [];
  if (collapsed) classList.push("collapsed");
  if (menuType) classList.push("sub"); // it is a sub page

  return (
    <nav id="mainNav" role="navigation" className={classList.join(" ")}>
      <ul>
        <MenuListItem url="/">
          <Icons.Placeholder text="Home" />
        </MenuListItem>
        <MenuListItem url="/discover">
          <Icons.Placeholder text="Discover" />
        </MenuListItem>
        <MenuListItem url="/opportunities">
          <Icons.Placeholder text="Opportunities" />
        </MenuListItem>
        <MenuListItem url="/browse">
          <Icons.Placeholder text="Browse" />
        </MenuListItem>
      </ul>
      {!collapsed && (
        <>
          <NavSection
            id="projects"
            title="Your Projects"
            linkPrefix="/p"
            items={state.projects}
            create="project"
            defaultOpen={true}
            moreOnClick={() => {}}
          />
          <NavSection
            id="groups"
            linkPrefix="/g"
            title="Your Groups"
            items={state.groups}
            defaultOpen={true}
            create="group"
          />
          <NavSection
            id="memberships"
            linkPrefix="/g"
            title="Memberships"
            items={state.memberships}
            moreOnClick={() => {}}
          />
          <NavSection
            id="subscriptions"
            linkPrefix="/g"
            title="Subscriptions"
            items={state.subscriptions}
          />
        </>
      )}
    </nav>
  );
};

export default MainNav;
