import React, { useState, useEffect, useRef } from "react";
import { Icons } from "../icons";

interface IDropdownProps {
  title?: string;
  placeholder: string;
  items: IKeyValuePair[];
  name: string;
  data: FormValue<string>;
  onChange: (name: string, value: string) => void;
}

const Dropdown: React.FC<IDropdownProps> = ({
  title,
  placeholder,
  items,
  name,
  data,
  onChange,
}) => {
  const [shown, setShown] = useState(false);
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
    const newValue = e.currentTarget.dataset.value || "";
    onChange(name, newValue);
    setShown(false);
  };

  return (
    <div
      className={`basic-dropdown${data.error ? " error " : ""}`}
      ref={dropdownRef}
      onMouseLeave={() => setShown(false)}
    >
      {title && (
        <header>
          <h4>{title}</h4>
          {data.error && <span className="error">{data.error}</span>}
        </header>
      )}

      <div
        className={`ui-inner${shown ? " focused" : ""}`}
        role="listbox"
        aria-expanded={shown}
      >
        <div className="label" onClick={() => setShown(!shown)}>
          {data.value ? (
            <span>{items.find((item) => item.value === data.value)?.key}</span>
          ) : (
            <>{placeholder && <span className="placeholder">{placeholder}</span>}</>
          )}

          <Icons.Arrow open={shown} />
        </div>

        {shown && (
          <div className="menu" ref={menuRef}>
            {items.length === 0 && (
              <div className="item">
                <span>No results found</span>
              </div>
            )}
            {items.map((item, key) => {
              const isSelected = data.value === item.value;

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
