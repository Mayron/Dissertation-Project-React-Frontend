import React from "react";
import Panel from "./panel";
import ProfilePic from "../../images/placeholder-profile-pic-lg.png";
import TextareaAutosize from "react-autosize-textarea";

interface ICreatePostPopupProps {
  togglePopup: (showPopup: boolean) => void;
}

const CreatePostPopup: React.FC<ICreatePostPopupProps> = ({ togglePopup }) => {
  return (
    <Panel className="create-post">
      <header>
        <img src={ProfilePic} alt="profile" />
        <div className="post-user">
          <p>
            Posting as <a className="user">Mike Richards</a>
          </p>
        </div>
      </header>
      <div className="body">
        <TextareaAutosize
          placeholder="Title"
          className="title-input"
          rows={1}
          maxLength={200}
        />
        <TextareaAutosize
          placeholder="(Optional) Write more..."
          className="more-input"
          rows={1}
          maxLength={2000}
        />
      </div>
      <footer>
        <div className="right row-20">
          <button className="btn-secondary" onClick={() => togglePopup(false)}>
            Cancel
          </button>
          <button className="btn-primary">Post</button>
        </div>
      </footer>
    </Panel>
  );
};

export default CreatePostPopup;
