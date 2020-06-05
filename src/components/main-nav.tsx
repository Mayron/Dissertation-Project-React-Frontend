import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Icons } from "./icons";
import menuData, { ILinkData } from "../api-data/main-nav-data";
import MenuHeader from "./menu-header";

interface IMenuListItemProps {
  url: string;
  active?: boolean;
}

const MenuListItem: React.FC<IMenuListItemProps> = ({
  url,
  children,
  active = false,
}) => (
  <li className="menu-item">
    <Link to={url} className={active && "active"}>
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

const MainNav: React.FC = () => {
  const [memberships, setMemberships] = useState<ILinkData[]>([]);
  const [projects, setProjects] = useState<ILinkData[]>([]);
  const [subscriptions, setSubscriptions] = useState<ILinkData[]>([]);

  useEffect(() => {
    setMemberships(menuData.memberships);
    setProjects([...menuData.projects]);
    setSubscriptions(menuData.subscriptions);
  }, []);

  return (
    <nav id="mainNav" role="navigation">
      <ul>
        <MenuListItem active url="/">
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
      <NavSection
        id="projects"
        title="Your Projects"
        items={projects}
        create="project"
        more
      />
      <NavSection id="groups" title="Your Groups" items={projects} create="group" />
      <NavSection id="memberships" title="Memberships" items={memberships} more />
      <NavSection id="subs" title="Subscriptions" items={subscriptions} />
    </nav>
  );
};

export default MainNav;
