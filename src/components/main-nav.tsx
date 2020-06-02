import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import ArrowButton from "./arrow-button";

// TODO: Replace with gatsby image
import PlaceholderIcon from "../images/placeholder-icon.svg";
import menuData, { ILinkData } from "../api-data/main-nav-data";

interface IMenuListItemProps {
  name: string;
  url: string;
  active?: boolean;
}

const MenuListItem: React.FC<IMenuListItemProps> = ({ name, url, active = false }) => (
  <li className="menu-item">
    <Link to={url} className={active && "active"}>
      <img src={PlaceholderIcon} alt="icon" />
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
    <header>
      <h3>
        {title} {amount && `(${amount})`}
      </h3>
      <ArrowButton />
    </header>
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
