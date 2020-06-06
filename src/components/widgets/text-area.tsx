import React from "react";

interface ITextAreaProps {
  title?: string;
  placeholder: string;
  max?: number;
}

const TextArea: React.FC<ITextAreaProps> = ({ title, placeholder, max }) => {
  return (
    <div className="text-area">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}
      <div className="ui-inner">
        <textarea maxLength={max} placeholder={placeholder}></textarea>
        {max && <div className="counter">0/{max}</div>}
      </div>
    </div>
  );
};

export default TextArea;
