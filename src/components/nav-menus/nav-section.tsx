import MenuListItem from "./menu-list-item";
import { Icons } from "../icons";
import MenuHeader from "./menu-header";
import React, { useState } from "react";

interface INavSectionProps {
  id: string;
  title: string;
  linkPrefix: string;
  items: NamedEntity[];
  moreOnClick?: () => void;
  moreUrl?: string;
  create?: string;
  defaultOpen?: boolean;
  moreText?: string;
}

const NavSection: React.FC<INavSectionProps> = ({
  id,
  title,
  linkPrefix,
  items,
  moreOnClick,
  moreUrl,
  create,
  defaultOpen = false,
  moreText = "Show more",
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
            {items.length === 0 && <p className="placeholder">No {id} found</p>}
            {items.map((item, key) => (
              <MenuListItem key={key} url={`${linkPrefix}/${item.id}`}>
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
              {items.length > 0 && (moreOnClick || moreUrl) && (
                <MenuListItem url={moreUrl}>
                  <Icons.Arrow text={moreText} className="action" open />
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
