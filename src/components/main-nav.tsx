import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Icons } from "./icons";
import menuData, { ILinkData } from "../api-data/main-nav-data";
import MenuHeader from "./menu-header";

interface IMenuListItemProps {
  name: string;
  url: string;
  active?: boolean;
}

const MenuListItem: React.FC<IMenuListItemProps> = ({ name, url, active = false }) => (
  <li className="menu-item">
    <Link to={url} className={active && "active"}>
      <Icons.Placeholder />
      <span>{name}</span>
    </Link>
  </li>
);

interface INavSectionProps {
  id: string;
  title: string;
  amount?: number;
  items: ILinkData[];
}

const NavSection: React.FC<INavSectionProps> = ({ id, title, amount, items }) => (
  <section id={id}>
    <MenuHeader title={title} amount={amount} />
    <ul>
      {items.map((item, key) => (
        <MenuListItem key={key} url={item.url} name={item.name} />
      ))}
    </ul>
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
        <MenuListItem active name="Home" url="/" />
        <MenuListItem name="Discover" url="/discover" />
        <MenuListItem name="Opportunities" url="/opportunities" />
        <MenuListItem name="Browse" url="/browse" />
      </ul>
      <NavSection id="projects" title="Your Projects" items={projects} amount={3} />
      <NavSection id="memberships" title="Memberships" items={memberships} amount={4} />
      <NavSection id="subs" title="Subscriptions" items={subscriptions} amount={1} />
    </nav>
  );
};

export default MainNav;
