import React from "react";
import Panel from "./panel";
import ProfilePic from "../../images/placeholder-profile-pic.svg";
import TextareaAutosize from "react-autosize-textarea";

interface ICreatePostPopupProps {
  displayName: string;
  onCancel: () => void;
  onPost: () => void;
  title: string;
  body: string;
  onChange: (name: string, value: string) => void;
}

const CreatePostPopup: React.FC<ICreatePostPopupProps> = ({
  displayName,
  onCancel,
  onPost,
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
      <div className="body">
        <TextareaAutosize
          placeholder="Title"
          className="title-input"
          rows={1}
          maxLength={200}
          onChange={(e) => onChange("title", e.currentTarget.value)}
          value={title}
        />
        <TextareaAutosize
          placeholder="(Optional) Write more..."
          className="more-input"
          rows={1}
          maxLength={2000}
          onChange={(e) => onChange("body", e.currentTarget.value)}
          value={body}
        />
      </div>
      <footer>
        <div className="right row-20">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onPost}>
            Post
          </button>
        </div>
      </footer>
    </Panel>
  );
};

export default CreatePostPopup;
