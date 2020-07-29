import React from "react";
import ProfilePic from "../../images/placeholder-profile-pic.svg";
import PostFooter from "./post-footer";
import { navigateTo, Link } from "gatsby";
import CommentBox from "./comment-box";
import TimeAgo from "react-timeago";
import { getTimeAgoUtc } from "../../utils";
import Marked from "marked";

interface IPostProps {
  url?: string;
  post: IPostModel;
  flags?: string[];
  onCommentSubmitted?: () => void;
  commentValue?: string;
  onCommentChanged?: (value: string) => void;
  submitting?: boolean;
}

const Post: React.FC<IPostProps> = ({
  url,
  post,
  flags,
  onCommentSubmitted,
  commentValue,
  onCommentChanged,
  submitting,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!url) return;
    const target = e.target as HTMLElement;

    if (target.nodeName === "A") return;
    navigateTo(url);
  };

  return (
    <article className={`post${url ? " panel-link" : ""}`} onClick={handleClick}>
      <header>
        <img src={ProfilePic} alt="profile" />
        <div className="post-user">
          <div>
            <a className="user">{post.authorDisplayName}</a>
            {post.groupName && url && (
              <>
                <span className="from-group">from</span>
                <Link
                  to={`/g/${post.groupId}`}
                  className="link"
                >{`${post.groupName}`}</Link>
              </>
            )}
          </div>

          <p>
            <TimeAgo date={getTimeAgoUtc(post.when)} />
            {flags?.map((flag, key) => (
              <span key={key} className="flag">
                {flag}
              </span>
            ))}
          </p>
        </div>
      </header>
      <div className="post-body">
        {post.title && <h4>{post.title}</h4>}
        {post.body && (
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: Marked.parse(post.body) }}
          ></div>
        )}
      </div>

      <PostFooter post={post} postedBy={false} />

      {onCommentSubmitted && onCommentChanged && commentValue !== undefined && (
        <CommentBox
          onSubmitted={onCommentSubmitted}
          value={commentValue}
          onChange={onCommentChanged}
          submitting={submitting}
        />
      )}
    </article>
  );
};

export default Post;
