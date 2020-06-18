import React, { useState, useRef, useEffect } from "react";
import { Icons } from "../icons";

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
  onChange: (tag: ITag, newValue: string) => void;
  onPaste: (tag: ITag, newValue: string) => void;
  stopEditing: (tag: ITag, cancel?: boolean) => void;
  startEditing: (tag: ITag) => void;
}

const TagBox: React.FC<ITagBoxProps> = ({
  tag,
  onChange,
  onPaste,
  startEditing,
  stopEditing,
}) => {
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
    onChange(tag, e.currentTarget.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    startEditing(tag);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.keyCode === 13 || e.keyCode === 9) {
      // enter or Tab
      stopEditing(tag);
    }

    if (e.keyCode === 27) {
      // Esc
      stopEditing(tag, true);
    }
  };

  const handleCloseButtonClicked = () => {
    stopEditing(tag, true);
  };

  const handleInputOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newValue = e.clipboardData.getData("Text");
    onPaste(tag, newValue);
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
          onPaste={handleInputOnPaste}
          maxLength={30}
        />
      ) : (
        <div className="tag">
          <span onClick={handleClick}>{tag.value}</span>
          <Icons.Close onClick={handleCloseButtonClicked} />
        </div>
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

  const handleValidationOfTagsAfterFinishEditing = (
    newValue: string,
    oldValue: string,
  ) => {
    newValue = newValue ? newValue.trim() : "";
    let nextTags = [...tags];

    if (newValue && newValue.trim().length > 0) {
      if (newValue.indexOf("\n") >= 0 || newValue.indexOf(",") >= 0) {
        // break a tag into multiple if they contain \n or ,
        newValue.split("\n").forEach((e) => {
          e.split(",").forEach((tag) => {
            const newTag = tag.trim();
            newTag.length > 0 && nextTags.push({ value: newTag });
          });
        });
        // remove old value being replaced
        nextTags = nextTags.filter((t) => t.value !== newValue);
      } else {
        // update old value with new if it was pasted but not split
        let currentTag = nextTags.find((t) => t.value === oldValue);
        if (currentTag) {
          currentTag.value = newValue;
          currentTag.editing = false;
        }
      }
    } else {
      nextTags = nextTags.filter((t) => t.value && t.value.length > 0);
      setTags(nextTags);
      setFocused(false);
      return;
    }

    // remove duplicates:
    nextTags = nextTags.filter(
      (data, index, self) =>
        self.findIndex(
          (d) => d.value.toLocaleLowerCase() === data.value.toLocaleLowerCase(),
        ) === index,
    );

    // remove invalid
    nextTags = nextTags.filter((t) => t.value && t.value.length > 0);

    if (nextTags.length > max) {
      // greater than max length allowed
      nextTags = nextTags.slice(0, max);
    }

    nextTags.push({ value: "", editing: true });
    setTags(nextTags);
  };

  const handleTagValueChanged = (tag: ITag, newValue: string) => {
    const nextTags = [...tags];

    if (tag) {
      tag.value = newValue;
    }

    setTags(nextTags);
  };

  const handleTagValuePasted = (tag: ITag, newValue: string) => {
    handleValidationOfTagsAfterFinishEditing(newValue, tag.value);
  };

  const handleStopEditing = (tag: ITag, cancel?: boolean) => {
    if (cancel) {
      setTags(tags.filter((t) => t !== tag));
      setFocused(false);
    } else {
      handleValidationOfTagsAfterFinishEditing(tag.value, tag.value);
    }
  };

  const handleStartEditing = (tag: ITag) => {
    const nextTags = [...tags];
    nextTags.forEach((t) => {
      if (t.editing && t !== tag) t.editing = false;
      if (t === tag) t.editing = true;
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
              onPaste={handleTagValuePasted}
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
