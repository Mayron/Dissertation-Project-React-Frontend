import React, { useState } from "react";

interface ITextFieldProps {
  title?: string;
  placeholder: string;
  required?: boolean;
  max?: number;
}

const TextField: React.FC<ITextFieldProps> = ({ title, placeholder, max, required }) => {
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
          type="text"
          maxLength={max}
          required={required}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {max && <span className="counter">0/{max}</span>}
      </div>
    </div>
  );
};

export default TextField;
