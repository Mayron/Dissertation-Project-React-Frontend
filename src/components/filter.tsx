import React from "react";
import { Icons } from "./icons";

interface IFilterProps {
  label: string;
  tooltip: string;
  selected: number;
  items: string[];
  show?: boolean;
}

const Filter: React.FC<IFilterProps> = ({ label, tooltip, selected, items, show }) => {
  return (
    <div className="filter">
      <header>
        <span>
          {label} <strong>{items[selected]}</strong>
        </span>
        <Icons.Arrow active={show} />
      </header>
      {show && (
        <div className="filter-dropdown">
          <ul>
            <li>{tooltip}</li>
            {items.map((item, key) => (
              <li key={key}>
                {key === selected && (
                  <div className="tick">
                    <Icons.Tick />
                  </div>
                )}
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
