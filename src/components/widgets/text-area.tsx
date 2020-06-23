import React, { useState, useRef } from "react";
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
  const [focused, setFocused] = useState(false);
  const [count, setCount] = useState<number>(0);

  let textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.target.value.length);
  };

  return (
    <div id={id} className="text-area">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}
      <div
        className={`ui-inner${focused ? " focused" : ""}`}
        style={{ cursor: "text" }}
        onClick={() => textAreaRef.current?.focus()}
      >
        <div className={max ? "textbox-wrapper has-max" : "textbox-wrapper"}>
          <TextareaAutosize
            ref={textAreaRef}
            placeholder={placeholder}
            rows={1}
            maxRows={5}
            maxLength={max}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleChange}
          />
        </div>
        {max && (
          <div className="counter">
            {count}/{max}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default TextArea;
