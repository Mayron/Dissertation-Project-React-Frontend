import React, { useState } from "react";

interface ITextFieldProps {
  title?: string;
  placeholder: string;
  required?: boolean;
  max?: number;
  style?: React.CSSProperties;
  name?: string;
}

const TextField: React.FC<ITextFieldProps> = ({
  title,
  placeholder,
  max,
  required,
  style,
  name,
}) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="text-field">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}
      <div className={`ui-inner${focused ? " focused" : ""}`}>
        <input
          type="text"
          maxLength={max}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          style={style}
          value={value}
          name={name}
        />
        {max && (
          <span className="counter">
            {value.length}/{max}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextField;
