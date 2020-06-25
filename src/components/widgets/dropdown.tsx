import React, { useState } from "react";
import { Icons } from "../icons";

interface IDropdownProps {
  title?: string;
  placeholder: string;
  required?: boolean;
  items: IKeyValuePair[];
}

const Dropdown: React.FC<IDropdownProps> = ({ title, placeholder, items, required }) => {
  const [shown, setShown] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleOptionClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelected(e.currentTarget.dataset.value || null);
    setShown(false);
  };

  return (
    <div className="dropdown">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}

      <div
        className={`ui-inner${shown ? " focused" : ""}`}
        role="listbox"
        aria-expanded={shown}
      >
        <div className="label" onClick={() => setShown(!shown)}>
          {selected ? (
            <span>{selected}</span>
          ) : (
            <>{placeholder && <span className="placeholder">{placeholder}</span>}</>
          )}

          <Icons.Arrow open={shown} />
        </div>

        {shown && (
          <div className="menu">
            {items.map((item, key) => {
              const isSelected = selected && selected === item.value;

              return (
                <div
                  role="option"
                  aria-selected={isSelected || false}
                  className={`${isSelected ? "selected " : ""}item`}
                  onClick={handleOptionClicked}
                  key={key}
                  data-value={item.value}
                >
                  <span>{item.key}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
