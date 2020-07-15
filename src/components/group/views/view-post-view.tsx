import React from "react";
import Post from "../../common/post";
import SearchBox from "../../common/search-box";
import Filter from "../../common/filter";
import { RouteComponentProps } from "@reach/router";
import Comment from "../../common/comment";
import ProfilePic from "../../../images/placeholder-profile-pic.svg";

interface IViewPostViewProps extends RouteComponentProps {
  postId?: string;
  postSlug?: string;
}

const ViewPostView: React.FC<IViewPostViewProps> = ({ postId, postSlug }) => {
  return (
    <>
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
    </>
  );
};

export default ViewPostView;
