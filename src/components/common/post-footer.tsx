import React from "react";
import { Icons } from "../icons";
import { Link } from "gatsby";

interface IPostFooterProps {
  postedBy?: string;
  when?: string;
  showIcons?: boolean;
}

const PostFooter: React.FC<IPostFooterProps> = ({ postedBy, when, showIcons = true }) => {
  return (
    <footer className="post-footer">
      {postedBy && (
        <p>
          Posted by{" "}
          <Link to="/u/mayron" className="user">
            {postedBy}
          </Link>{" "}
          {when}
        </p>
      )}
      {showIcons && (
        <ul>
          <li>
            <Icons.Heart text="12.5k" />
          </li>
          <li>
            <Icons.Comment text="1.5k" />
          </li>
          <li>
            <Icons.Share />
          </li>
          <li>
            <Icons.Save />
          </li>
          <li>
            <Icons.Arrow text="more" textDirection="left" />
          </li>
        </ul>
      )}
    </footer>
  );
};

export default PostFooter;
