import React, { useState } from "react";

interface ITextFieldProps {
  title?: string;
  placeholder: string;
  required?: boolean;
  max?: number;
  style?: React.CSSProperties;
  name: string;
  type?: string;
  value: string;
  onChange: (name: string, value: string) => void;
  min?: number;
}

const TextField: React.FC<ITextFieldProps> = ({
  title,
  placeholder,
  max,
  required,
  style,
  name,
  type = "text",
  value,
  onChange,
  min,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="text-field">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}
      <div className={`ui-inner${focused ? " focused" : ""}`}>
        <input
          type={type}
          maxLength={max}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(name, e.target.value)}
          style={style}
          value={value}
          name={name}
          minLength={min}
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
