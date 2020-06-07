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
import PlusIcon from "../images/icons/plus.inline.svg";
import SettingsIcon from "../images/icons/settings.inline.svg";

interface IIconProps {
  text?: string;
  className?: string;
}

interface IArrowIconProps extends IIconProps {
  large?: boolean;
  up?: boolean;
}

export const Arrow: React.FC<IArrowIconProps> = ({ text, className, large, up }) => {
  const classes = ["arrow-icon"];
  if (className) classes.push(className);
  if (large) classes.push("lg");
  if (up) classes.push("up");

  return (
    <div className={classes.join(" ")}>
      <ArrowIcon />
      {text && <span>{text}</span>}
    </div>
  );
};

export const Heart: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `heart-icon ${className}` : "heart-icon"}>
    <HeartIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Comment: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `comment-icon ${className}` : "comment-icon"}>
    <CommentIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Share: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `share-icon ${className}` : "share-icon"}>
    <ShareIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Save: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `save-icon ${className}` : "save-icon"}>
    <SaveIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Tick: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `tick-icon ${className}` : "tick-icon"}>
    <TickIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Search: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `search-icon ${className}` : "search-icon"}>
    <SearchIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Burger: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `burger-icon ${className}` : "burger-icon"}>
    <BurgerIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Notification: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `notification-icon ${className}` : "notification-icon"}>
    <NotificationIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Placeholder: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `placeholder-icon ${className}` : "placeholder-icon"}>
    <PlaceholderIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Plus: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `plus-icon ${className}` : "plus-icon"}>
    <PlusIcon />
    {text && <span>{text}</span>}
  </div>
);

export const Settings: React.FC<IIconProps> = ({ text, className }) => (
  <div className={className ? `settings-icon ${className}` : "settings-icon"}>
    <SettingsIcon />
    {text && <span>{text}</span>}
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
  Plus,
  Settings,
};
