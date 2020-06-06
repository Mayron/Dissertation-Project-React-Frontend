import React from "react";

interface ITextFieldProps {
  title?: string;
  placeholder: string;
  required?: boolean;
  max?: number;
}

const TextField: React.FC<ITextFieldProps> = ({ title, placeholder, max, required }) => {
  return (
    <div className="text-field">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}
      <div className="ui-inner">
        <input
          type="text"
          maxLength={max}
          required={required}
          placeholder={placeholder}
        />
        {max && <span className="counter">0/{max}</span>}
      </div>
    </div>
  );
};

export default TextField;
