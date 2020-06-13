import React from "react";
import { Icons } from "../icons";
import ProfilePic from "../../images/placeholder-profile-pic-lg.png";

interface IVoteProps {
  value: number;
}

const Vote: React.FC<IVoteProps> = ({ value }) => {
  return (
    <div className="vote">
      <button>
        <Icons.Arrow direction="up" />
      </button>
      <span>{value}</span>
      <button>
        <Icons.Arrow direction="down" />
      </button>
    </div>
  );
};

const VotingPost = () => {
  return (
    <article className="post">
      <header>
        <Vote value={8} />
        <div className="f-align-c">
          <img src={ProfilePic} alt="profile" />
          <div className="post-user">
            <a className="user">John Smith</a>
            <p>16 hours ago</p>
          </div>
        </div>
      </header>
      <div className="post-body">
        <h4>This is the Title of this post! Why do they all do it?</h4>
        <div className="post-contents">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque elit
          arcu, et fringilla mauris dignissim sit amet. Maecenas facilisis dignissim erat.
          Praesent faucibus facilisis tortor vel ornare. Sed lacinia eu urna nec
          condimentum. Suspendisse molestie mauris ac ligula molestie malesuada. Duis sed
          tellus ipsum.
        </div>
      </div>
      <footer className="post-footer">
        <ul>
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
    </article>
  );
};

export default VotingPost;
