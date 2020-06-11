import MenuListItem from "./menu-list-item";
import { Icons } from "../icons";
import { ILinkData } from "../../api-data/main-nav-data";
import MenuHeader from "./menu-header";
import React from "react";

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
            <Icons.Arrow text="Show more" className="action" open />
          </MenuListItem>
        )}
      </ul>
    </footer>
  </section>
);

export default NavSection;
