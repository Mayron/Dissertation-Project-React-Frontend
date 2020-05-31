import React, { useEffect, useState } from "react";

// TODO: Replace with gatsby image
import PlaceholderIcon from "../images/placeholder-icon.svg";
import menuData, { ILinkData } from "../api-data/main-nav-data";
import { Link } from "gatsby";

interface IMenuListItemProps {
  name: string;
  url: string;
}

const MenuListItem: React.FC<IMenuListItemProps> = ({ name, url }) => (
  <li>
    <Link to={url}>
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
        <li>Home</li>
        <li>Discover</li>
        <li>Opportunities</li>
        <li>Browse</li>
      </ul>
      <NavSection id="projects" title="Your Projects" items={projects} />
      <NavSection id="memberships" title="Memberships" items={memberships} />
      <NavSection id="subs" title="Subscriptions" items={subscriptions} />
    </nav>
  );
};

export default MainNav;
