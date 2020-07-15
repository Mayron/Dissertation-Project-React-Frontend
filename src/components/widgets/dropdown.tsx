import React, { useState, useEffect, useRef } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shown && menuRef.current && dropdownRef.current) {
      const bounds = menuRef.current.getBoundingClientRect();
      const outsideViewPoint = window.innerHeight < bounds.bottom;
      const dropdownBounds = dropdownRef.current.getBoundingClientRect();

      const noRoom =
        dropdownBounds.bottom + menuRef.current.offsetHeight > window.innerHeight;

      if (outsideViewPoint || noRoom) {
        dropdownRef.current.classList.add("up");
      } else {
        dropdownRef.current.classList.remove("up");
      }
    }
  }, [shown]);

  const handleOptionClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelected(e.currentTarget.dataset.value || null);
    setShown(false);
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLDivElement>) => {};

  return (
    <div
      className="basic-dropdown"
      ref={dropdownRef}
      onMouseLeave={() => setShown(false)}
      onLoad={handleLoad}
    >
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
          <div className="menu" ref={menuRef}>
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
