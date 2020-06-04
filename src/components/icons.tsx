import React from "react";

import ArrowIcon from "../images/icons/arrow.inline.svg";
import BurgerIcon from "../images/icons/burger.inline.svg";
import CommentIcon from "../images/icons/comment.inline.svg";
import HeartIcon from "../images/icons/heart.inline.svg";
import NotificationIcon from "../images/icons/notification.inline.svg";
import PlaceholderIcon from "../images/icons/placeholder.inline.svg";
import SearchIcon from "../images/icons/search.inline.svg";
import ShareIcon from "../images/icons/share.inline.svg";
import SaveIcon from "../images/icons/save.inline.svg";
import TickIcon from "../images/icons/tick.inline.svg";

interface IArrowProps {
  active?: boolean;
  text?: string;
}

export const Arrow: React.FC<IArrowProps> = ({ active, text }) => (
  <div className="arrow-icon">
    <div className={`arrow${active ? " active" : ""}`}>
      <ArrowIcon />
    </div>
    {text && <span>{text}</span>}
  </div>
);

interface IHeartProps {
  text?: string;
}

export const Heart: React.FC<IHeartProps> = ({ text }) => (
  <div className="text-icon">
    <HeartIcon />
    {text && <span>{text}</span>}
  </div>
);

interface ICommentProps {
  text?: string;
}

export const Comment: React.FC<ICommentProps> = ({ text }) => (
  <div className="comment-icon">
    <CommentIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Share: React.FC = () => (
  <div className="share-icon">
    <ShareIcon />
    <span>share</span>
  </div>
);

export const Save: React.FC = () => (
  <div className="save-icon">
    <SaveIcon />
    <span>save</span>
  </div>
);

export const Tick: React.FC = () => (
  <div className="tick-icon">
    <TickIcon />
  </div>
);

export const Search: React.FC = () => (
  <div className="search-icon">
    <SearchIcon />
  </div>
);

export const Burger: React.FC = () => (
  <div className="burger-icon">
    <BurgerIcon />
  </div>
);

export const Notification: React.FC = () => (
  <div className="notification-icon">
    <NotificationIcon />
  </div>
);

export const Placeholder: React.FC = () => (
  <div className="placeholder-icon">
    <PlaceholderIcon />
  </div>
);

export const Icons = {
  Arrow,
  Heart,
  Comment,
  Share,
  Save,
  Tick,
  Search,
  Burger,
  Notification,
  Placeholder,
};
