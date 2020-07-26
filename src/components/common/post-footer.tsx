import React from "react";
import { Icons } from "../icons";
import { Link } from "gatsby";
import { formatStatistic, getTimeAgoUtc } from "../../utils";
import TimeAgo from "react-timeago";

interface IPostFooterProps {
  post: IPostModel;
  postedBy?: boolean;
}

const PostFooter: React.FC<IPostFooterProps> = ({ post, postedBy = true }) => {
  return (
    <footer className="post-footer">
      {postedBy && (
        <div>
          Posted by{" "}
          <Link to="/u/mayron" className="user">
            {post.authorDisplayName}
          </Link>{" "}
          <TimeAgo date={getTimeAgoUtc(post.when)} />
        </div>
      )}

      <ul>
        <li>
          <Icons.Heart text={formatStatistic(post.votes)} />
        </li>
        <li>
          <Icons.Comment text={formatStatistic(post.totalComments)} />
        </li>
        {/* <li>
          <Icons.Share />
        </li> */}
        <li>
          <Icons.Save text="save" />
        </li>
        {/* <li>
          <Icons.Arrow text="more" textDirection="left" />
        </li> */}
      </ul>
    </footer>
  );
};

export default PostFooter;
