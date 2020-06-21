import MenuListItem from "./menu-list-item";
import { Icons } from "../icons";
import { ILinkData } from "../../api-data/main-nav-data";
import MenuHeader from "./menu-header";
import React, { useState } from "react";

interface INavSectionProps {
  id: string;
  title: string;
  items: ILinkData[];
  moreOnClick?: () => void;
  moreUrl?: string;
  create?: string;
  defaultOpen?: boolean;
}

const NavSection: React.FC<INavSectionProps> = ({
  id,
  title,
  items,
  moreOnClick,
  moreUrl,
  create,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section id={id}>
      <MenuHeader
        title={title}
        amount={items.length}
        onClick={() => setOpen(!open)}
        open={open}
      />
      {open && (
        <>
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
              {(moreOnClick || moreUrl) && (
                <MenuListItem url={moreUrl}>
                  <Icons.Arrow text="Show more" className="action" open />
                </MenuListItem>
              )}
            </ul>
          </footer>
        </>
      )}
    </section>
  );
};

export default NavSection;
