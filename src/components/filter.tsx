import React from "react";
import TickIcon from "../images/tick-icon.inline.svg";
import ArrowButton from "./arrow-button";

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
        <ArrowButton active={show} />
      </header>
      {show && (
        <div className="filter-dropdown">
          <ul>
            <li>{tooltip}</li>
            {items.map((item, key) => (
              <li key={key}>
                {key === selected && (
                  <div className="tick">
                    <TickIcon />
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
