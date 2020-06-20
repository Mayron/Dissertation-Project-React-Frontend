import React, { useState } from "react";
import Layout from "../components/layout";
import PostBox from "../components/post-box";
import ToolBar from "../components/index/tool-bar";
import { RouteComponentProps } from "@reach/router";
import Post from "../components/common/post";
import Panel from "../components/common/panel";
import ProfilePic from "../images/placeholder-profile-pic-lg.png";
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

const IndexPage: React.FC<RouteComponentProps> = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Layout id="index">
      <PostBox togglePopup={setShowPopup} showPopup={showPopup}>
        <CreatePostPopup togglePopup={setShowPopup} />
      </PostBox>
      <ToolBar />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
      <Post url="/u/mayron/post/this-is-the-title-of-the-post" />
    </Layout>
  );
};

export default IndexPage;
