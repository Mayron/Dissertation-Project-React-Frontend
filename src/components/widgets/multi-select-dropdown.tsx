import React from "react";

interface IMultiSelectDropdownProps {
  title?: string;
  placeholder: string;
  max: number;
  items: IKeyValuePair[];
}

const MultiSelectDropdown: React.FC<IMultiSelectDropdownProps> = ({
  title,
  placeholder,
  max,
  items,
}) => {
  return (
    <div className="multi-dropdown">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}
      <div className="ui-inner">
        <div className="editbox">
          {placeholder && <span className="placeholder">{placeholder}</span>}
        </div>

        {max && <div className="counter">0/{max}</div>}
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

export default MultiSelectDropdown;
