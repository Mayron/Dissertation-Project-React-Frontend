import React from "react";
import { Icons } from "../icons";
import { Link } from "gatsby";

interface IPostFooterProps {
  postedBy?: string;
  when?: string;
}

const PostFooter: React.FC<IPostFooterProps> = ({ postedBy, when }) => {
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
          <Icons.Arrow text="more" />
        </li>
      </ul>
    </footer>
  );
};

export default PostFooter;
