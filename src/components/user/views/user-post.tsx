import React from "react";
import { RouteComponentProps } from "@reach/router";
import Layout from "../../layout";
import Post from "../../common/post";
import ProfilePic from "../../../images/placeholder-profile-pic-lg.png";
import TextareaAutosize from "react-autosize-textarea";
import Filter from "../../common/filter";
import SearchBox from "../../common/search-box";
import Comment from "../../common/comment";

interface ICommentBoxProps {}

const CommentBox: React.FC<ICommentBoxProps> = ({}) => {
  return (
    <article className="comment-box">
      <header>
        <img src={ProfilePic} alt="profile" />
        <span className="meta">Comment as</span>
        <a className="user">John Smith</a>
      </header>
      <TextareaAutosize placeholder="Any thoughts?" rows={1} maxLength={2000} />
      <footer>
        <button className="btn-primary">Comment</button>
      </footer>
    </article>
  );
};

interface IUserPostViewProps extends RouteComponentProps {
  user?: string;
  slug?: string;
}

const UserPostView: React.FC<IUserPostViewProps> = ({ user, slug }) => {
  return (
    <Layout id="index" title={slug}>
      <Post>
        <CommentBox />
      </Post>
      <div className="comment-toolbar" role="toolbar">
        <div className="row-10">
          <h4>Comments (3)</h4>
          <SearchBox placeholder="Search comments" />
        </div>

        <Filter
          label="Sort by"
          tooltip="Sort by"
          selected={0}
          items={[
            "Most replies",
            "Least replies",
            "Most upvoted",
            "Least upvoted",
            "Newest",
            "Oldest",
          ]}
        />
      </div>
      <Comment>
        <img src={ProfilePic} alt="profile" />
        <div className="post-user">
          <a className="user">John Smith</a>
          <p>16 hours ago</p>
        </div>
      </Comment>
      <Comment>
        <img src={ProfilePic} alt="profile" />
        <div className="post-user">
          <a className="user">John Smith</a>
          <p>16 hours ago</p>
        </div>
      </Comment>
      <Comment>
        <img src={ProfilePic} alt="profile" />
        <div className="post-user">
          <a className="user">John Smith</a>
          <p>16 hours ago</p>
        </div>
      </Comment>
    </Layout>
  );
};

export default UserPostView;
