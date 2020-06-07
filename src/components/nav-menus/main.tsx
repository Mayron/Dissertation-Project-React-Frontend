import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Icons } from "../icons";
import menuData, { ILinkData } from "../../api-data/main-nav-data";
import MenuHeader from "../menu-header";

interface IMenuListItemProps {
  url: string;
}

const MenuListItem: React.FC<IMenuListItemProps> = ({ url, children }) => (
  <li className="menu-item">
    <Link to={url} activeClassName="active">
      {children}
    </Link>
  </li>
);

interface INavSectionProps {
  id: string;
  title: string;
  items: ILinkData[];
  more?: boolean;
  create?: string;
}

const NavSection: React.FC<INavSectionProps> = ({ id, title, items, more, create }) => (
  <section id={id}>
    <MenuHeader title={title} amount={items.length} />
    <ul>
      {items.map((item, key) => (
        <MenuListItem key={key} url={item.url}>
          <Icons.Placeholder text={item.name} />
        </MenuListItem>
      ))}
    </ul>
    <footer>
      <ul>
        {create && (
          <MenuListItem url={`/create/${create}`}>
            <Icons.Plus text={`Create ${create}`} className="action" />
          </MenuListItem>
        )}
        {more && (
          <MenuListItem url={`/create/${create}`}>
            <Icons.Arrow text="Show more" className="action" />
          </MenuListItem>
        )}
      </ul>
    </footer>
  </section>
);

interface IMainNavProps {
  collapsed?: boolean;
}

const MainNav: React.FC<IMainNavProps> = ({ collapsed }) => {
  const [projects, setProjects] = useState<ILinkData[]>([]);
  const [groups, setGroups] = useState<ILinkData[]>([]);
  const [memberships, setMemberships] = useState<ILinkData[]>([]);
  const [subscriptions, setSubscriptions] = useState<ILinkData[]>([]);

  useEffect(() => {
    setProjects([...menuData.projects]);
    setGroups([...menuData.groups]);
    setMemberships(menuData.memberships);

    setSubscriptions(menuData.subscriptions);
  }, []);

  return (
    <nav id="mainNav" role="navigation" className={collapsed ? "collapsed" : ""}>
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
            items={projects}
            create="project"
            more
          />
          <NavSection
            id="groups"
            title="Your Groups &amp; Communities"
            items={groups}
            create="group"
          />
          <NavSection id="memberships" title="Memberships" items={memberships} more />
          <NavSection id="subs" title="Subscriptions" items={subscriptions} />
        </>
      )}
    </nav>
  );
};

export default MainNav;
