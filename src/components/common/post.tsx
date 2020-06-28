import React from "react";
import ProfilePic from "../../images/placeholder-profile-pic-lg.png";
import PostFooter from "./post-footer";
import { navigateTo } from "gatsby";
import CommentBox from "./comment-box";

interface IPostProps {
  url?: string;
  includeCommentBox?: boolean;
  defaultFooter?: boolean;
  flags?: string[];
}

const Post: React.FC<IPostProps> = ({
  url,
  children,
  includeCommentBox,
  defaultFooter = true,
  flags,
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
          <a className="user">John Smith</a>
          <p>
            16 hours ago{" "}
            {flags?.map((flag, key) => (
              <span key={key} className="flag">
                {flag}
              </span>
            ))}
          </p>
        </div>
      </header>
      <div className="post-body">{children}</div>

      {defaultFooter && <PostFooter />}
      {includeCommentBox && <CommentBox />}
    </article>
  );
};

export default Post;
