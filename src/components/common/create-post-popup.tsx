import React from "react";
import Panel from "./panel";
import ProfilePic from "../../images/placeholder-profile-pic.svg";
import TextareaAutosize from "react-autosize-textarea";
import { Dropdown } from "semantic-ui-react";

interface ICreatePostPopupProps {
  displayName: string;
  group: FormValue<string>;
  selectGroup?: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: FormValue<string>;
  body: FormValue<string>;
  onChange: (name: string, value: string) => void;
}

const CreatePostPopup: React.FC<ICreatePostPopupProps> = ({
  displayName,
  group,
  selectGroup,
  onCancel,
  onSubmit,
  title,
  body,
  onChange,
}) => {
  return (
    <Panel className="create-post">
      <header>
        <img src={ProfilePic} alt="profile" />
        <div className="post-user">
          <p>
            Posting as <a className="user">{displayName}</a>
          </p>
        </div>
      </header>
      <form onSubmit={onSubmit}>
        <div className="body">
          {title.error && <span className="error">{title.error}</span>}
          <TextareaAutosize
            placeholder="Title"
            className="title-input"
            required
            rows={1}
            maxLength={200}
            onChange={(e) => onChange("title", e.currentTarget.value)}
            value={title.value}
          />
          <TextareaAutosize
            placeholder="(Optional) Write more..."
            className="more-input"
            rows={1}
            maxLength={2000}
            onChange={(e) => onChange("body", e.currentTarget.value)}
            value={body.value}
          />
        </div>
        {group.error && <span className="error">{group.error}</span>}
        <footer>
          {selectGroup && (
            <Dropdown
              placeholder="Select Group"
              fluid
              search
              error={group.error ? true : false}
              selection
              value={group.value}
              options={[{ key: "mui", value: "mui", text: "MayronUI" }]}
              onChange={(_, { value }) => onChange("group", `${value}`)}
            />
          )}
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" type="submit">
            Post
          </button>
        </footer>
      </form>
    </Panel>
  );
};

export default CreatePostPopup;
