import React from "react";
import { RouteComponentProps } from "@reach/router";
import Layout from "../../layout";
import Post from "../../common/post";
import ProfilePic from "../../../images/placeholder-profile-pic.svg";
import Filter from "../../common/filter";
import SearchBox from "../../common/search-box";
import Comment from "../../common/comment";
import PostFooter from "../../common/post-footer";

interface IUserPostViewProps extends RouteComponentProps {
  user?: string;
  slug?: string;
}

const UserPostView: React.FC<IUserPostViewProps> = ({ user, slug }) => {
  return (
    <Layout id="index" title={slug}>
      <Post author="No idea" when="3 days">
        <h4>This is the Title of this post! Why do they all do it?</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque elit
          arcu, et fringilla mauris dignissim sit amet. Maecenas facilisis dignissim erat.
          Praesent faucibus facilisis tortor vel ornare. Sed lacinia eu urna nec
          condimentum. Suspendisse molestie mauris ac ligula molestie malesuada. Duis sed
          tellus ipsum.
        </p>
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
