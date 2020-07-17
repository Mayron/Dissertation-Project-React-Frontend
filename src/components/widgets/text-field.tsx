import React, { useState } from "react";

interface ITextFieldProps {
  title?: string;
  id?: string;
  placeholder: string;
  required?: boolean;
  max?: number;
  style?: React.CSSProperties;
  type?: string;
  name: string;
  data: FormValue<string>;
  onChange: (name: string, value: string) => void;
  min?: number;
}

const TextField: React.FC<ITextFieldProps> = ({
  title,
  id,
  placeholder,
  max,
  required,
  style,
  name,
  type = "text",
  data,
  onChange,
  min,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div id={id} className="text-field">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}
      {data.error && <span className="error">{data.error}</span>}
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
          value={data.value || ""}
          name={name}
          minLength={min}
        />
        {max && (
          <span className="counter">
            {data.value ? data.value.length : 0}/{max}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextField;
