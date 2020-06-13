import React, { useState } from "react";
import { Icons } from "../icons";

interface IFilterProps {
  label?: string;
  tooltip: string;
  selected?: number;
  items: string[];
}

const Filter: React.FC<IFilterProps> = ({ label, tooltip, selected, items }) => {
  const [shown, setShown] = useState<boolean>(false);

  return (
    <div className="filter">
      <header>
        <Icons.Arrow onClick={() => setShown(!shown)} direction={shown ? "up" : "down"}>
          <p>
            {label && <span>{label}</span>}
            {selected != undefined && <strong>{items[selected]}</strong>}
          </p>
        </Icons.Arrow>
      </header>
      {shown && (
        <div className={`filter-dropdown${selected == undefined ? " no-select" : ""}`}>
          <ul>
            <li>{tooltip}</li>
            {items.map((item, key) => (
              <li key={key}>
                {selected != undefined && key === selected && (
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
