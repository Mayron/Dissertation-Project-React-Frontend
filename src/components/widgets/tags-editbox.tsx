import React, { useState, useRef, useEffect } from "react";

interface ITagsEditBoxProps {
  title?: string;
  placeholder: string;
  max: number;
}

interface ITag {
  editing?: boolean;
  value: string;
}

interface ITagBoxProps {
  tag: ITag;
  onChange: (oldValue: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  stopEditing: (value: string, cancel?: boolean) => void;
  startEditing: (value: string) => void;
}

const TagBox: React.FC<ITagBoxProps> = ({ tag, onChange, startEditing, stopEditing }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input.focus();

      var handler = document.getElementById("__text-resize-handler") as HTMLDivElement;
      handler.textContent = input.value;
      input.style.width = `${handler.getBoundingClientRect().width}px`;
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange(tag.value, e);
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    startEditing(tag.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.keyCode === 13 || e.keyCode === 9) {
      // enter or Tab
      stopEditing(tag.value);
    }

    if (e.keyCode === 27) {
      // Esc
      stopEditing(tag.value, true);
    }
  };

  return (
    <>
      {tag.editing ? (
        <input
          ref={inputRef}
          className="tag"
          type="text"
          value={tag.value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          maxLength={30}
        />
      ) : (
        <span className="tag" onClick={handleClick}>
          {tag.value}
        </span>
      )}
    </>
  );
};

const TagsEditBox: React.FC<ITagsEditBoxProps> = ({ title, placeholder, max }) => {
  const [focused, setFocused] = useState(false);
  const [tags, setTags] = useState<ITag[]>([]);

  const handleTagEditBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // can only have one editing at any given time
    if (tags.findIndex((t) => t.editing) >= 0) return;
    if (tags.length >= max) return;

    setTags([...tags, { value: "", editing: true }]);
    setFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const nextTags = [...tags.filter((t) => t.value.length > 0)];
    nextTags.forEach((t) => (t.editing = false));
    setTags(nextTags);
    setFocused(false);
  };

  const handleTagValueChanged = (
    oldValue: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.currentTarget.value;
    const nextTags = [...tags];
    const tag = nextTags.find((t) => t.value == oldValue);

    if (tag) {
      tag.value = newValue;
    }

    setTags(nextTags);
  };

  const handleStopEditing = (value: string, cancel?: boolean) => {
    const nextTags = [...tags.filter((t) => t.value !== value)];

    if (!cancel && value.length > 0) {
      nextTags.push({ value: value, editing: false });
    }

    setTags(nextTags);
    setFocused(false);
  };

  const handleStartEditing = (value: string) => {
    const nextTags = [...tags];
    nextTags.forEach((t) => {
      if (t.editing && t.value !== value) t.editing = false;
      if (t.value === value) t.editing = true;
    });

    setTags(nextTags);
  };

  return (
    <div className="tags-editbox">
      {title && (
        <header>
          <h4>{title}</h4>
        </header>
      )}
      <div
        className={`ui-inner${focused ? " focused" : ""}`}
        onClick={handleTagEditBoxClick}
        onBlur={handleBlur}
      >
        <div className="editbox">
          {tags.length === 0 && <p className="placeholder">{placeholder}</p>}
          {tags.map((tag, key) => (
            <TagBox
              key={key}
              tag={tag}
              onChange={handleTagValueChanged}
              startEditing={handleStartEditing}
              stopEditing={handleStopEditing}
            />
          ))}
        </div>

        {max && (
          <div className="counter">
            {tags.length}/{max}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsEditBox;
