import React from "react";
import { Icons } from "../icons";

interface IDropdownProps {
  title?: string;
  placeholder: string;
  required?: boolean;
  items: IKeyValuePair[];
}

const Dropdown: React.FC<IDropdownProps> = ({ title, placeholder, items, required }) => {
  return (
    <div className="dropdown">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}
      <div className="ui-inner">
        {placeholder && <span className="placeholder">{placeholder}</span>}
        <Icons.Arrow />
      </div>
      <select>
        {items.map((item, key) => (
          <option key={key} value={item.value}>
            {item.key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
