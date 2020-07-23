import React, { useEffect, useState, useContext } from "react";
import { Icons } from "../icons";
import MenuListItem from "./menu-list-item";
import NavSection from "./nav-section";
import { SignalRContext } from "../signalr-provider";
import { AuthContext } from "../auth-provider";
import { invokeApiHub } from "../../api";

interface IMainNavProps {
  collapsed?: boolean;
  menuType?: "group" | "project" | "auth";
}

const MainNav: React.FC<IMainNavProps> = ({ collapsed, menuType }) => {
  const connection = useContext(SignalRContext);
  const { token } = useContext(AuthContext);

  const [projects, setProjects] = useState<NamedEntity[]>([]);
  const [groups, setGroups] = useState<NamedEntity[]>([]);
  const [memberships, setMemberships] = useState<NamedEntity[]>([]);
  const [subscriptions, setSubscriptions] = useState<NamedEntity[]>([]);

  useEffect(() => {
    if (!(token && connection)) return;

    ["Projects", "Groups", "Memberships", "Subscriptions"].forEach((t) => {
      invokeApiHub<IPayloadEvent<NamedEntity[]>>(connection, `FetchUser${t}`, (ev) => {
        switch (t) {
          case "Projects":
            setProjects(ev.payload || []);
            break;
          case "Groups":
            setGroups(ev.payload || []);
            break;
          case "Memberships":
            setMemberships(ev.payload || []);
            break;
          case "Subscriptions":
            setSubscriptions(ev.payload || []);
            break;
        }
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
        {/* <MenuListItem url="/discover">
          <Icons.Placeholder text="Discover" />
        </MenuListItem>
        <MenuListItem url="/opportunities">
          <Icons.Placeholder text="Opportunities" />
        </MenuListItem>
        <MenuListItem url="/browse">
          <Icons.Placeholder text="Browse" />
        </MenuListItem> */}
      </ul>
      {!collapsed && (
        <>
          <NavSection
            id="projects"
            title="Your Projects"
            linkPrefix="/p"
            items={projects}
            create="project"
            defaultOpen={true}
            moreOnClick={() => {}}
          />
          <NavSection
            id="groups"
            linkPrefix="/g"
            title="Your Groups"
            items={groups}
            defaultOpen={true}
            create="group"
          />
          {token && (
            <>
              <NavSection
                id="memberships"
                linkPrefix="/g"
                title="Memberships"
                items={memberships}
                moreOnClick={() => {}}
              />
              <NavSection
                id="subscriptions"
                linkPrefix="/g"
                title="Subscriptions"
                items={subscriptions}
              />
            </>
          )}
        </>
      )}
    </nav>
  );
};

export default MainNav;
