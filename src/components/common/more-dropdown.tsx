import React, { useState, useRef, useEffect } from "react";
import { Icons } from "../icons";

interface IMoreDropdownProps {
  label?: string;
  tooltip?: string;
  selected?: number;
  items: string[];
}

const MoreDropdown: React.FC<IMoreDropdownProps> = ({
  label,
  tooltip,
  selected,
  items,
}) => {
  const [shown, setShown] = useState<boolean>(false);
  const [mouseInside, setMouseInside] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null;

    if (shown) {
      interval = setInterval(() => {
        if (!mouseInside && interval) {
          setShown(false);
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [shown, mouseInside]);

  return (
    <div
      className="filter"
      onMouseEnter={() => setMouseInside(true)}
      onMouseLeave={() => setMouseInside(false)}
    >
      <Icons.More onClick={() => setShown(!shown)} />
      {shown && (
        <div className={`filter-dropdown${selected == undefined ? " no-select" : ""}`}>
          <ul>
            {tooltip && <li className="tooltip">{tooltip}</li>}
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

export default MoreDropdown;
