import React from "react";
import TextareaAutosize from "react-autosize-textarea";

interface ITextAreaProps {
  id?: string;
  title?: string;
  placeholder: string;
  max?: number;
}

const TextArea: React.FC<ITextAreaProps> = ({
  id,
  title,
  placeholder,
  max,
  children,
}) => {
  return (
    <div id={id} className="text-area">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}
      <div className="ui-inner">
        <div className={max ? "textbox-wrapper has-max" : "textbox-wrapper"}>
          <TextareaAutosize
            placeholder={placeholder}
            rows={1}
            maxRows={5}
            maxLength={max}
          />
        </div>
        {max && <div className="counter">0/{max}</div>}
        {children}
      </div>
    </div>
  );
};

export default TextArea;
