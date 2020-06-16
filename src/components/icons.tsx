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
import EditIcon from "../images/icons/edit.inline.svg";

export interface IIconProps {
  text?: string;
  textDirection?: "left" | "right";
  className?: string;
  onClick?: () => void;
}

interface IBaseIconProps extends IIconProps {
  iconType: string;
  icon: () => React.ReactNode;
  onClick?: () => void;
}

const BaseIcon: React.FC<IBaseIconProps> = ({
  text,
  textDirection = "right",
  className,
  iconType,
  icon,
  onClick,
  children,
}) => {
  if (className) {
    className = `${iconType}-icon ${className}`;
  } else {
    className = `${iconType}-icon`;
  }

  return (
    <div
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        console.log(onClick);
        if (onClick) onClick();
      }}
    >
      {children}
      {textDirection === "left" && text && <span>{text}</span>}
      {icon()}
      {textDirection === "right" && text && <span>{text}</span>}
    </div>
  );
};

export interface IArrowIconProps extends IIconProps {
  large?: boolean;
  open?: boolean;
  direction?: "up" | "down";
  textDirection?: "left" | "right";
}

export const Arrow: React.FC<IArrowIconProps> = ({
  text,
  textDirection,
  className,
  onClick,
  large,
  open,
  direction,
  children,
}) => {
  const classes = [];
  if (className) classes.push(className);
  if (large) classes.push("lg");
  if (open) classes.push("open");
  if (direction) classes.push(direction);

  return (
    <BaseIcon
      text={text}
      className={classes.join(" ")}
      iconType="arrow"
      onClick={onClick}
      textDirection={textDirection}
      icon={() => <ArrowIcon />}
    >
      {children}
    </BaseIcon>
  );
};

export const Heart: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="heart"
    icon={() => <HeartIcon />}
  />
);

export const Comment: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="comment"
    icon={() => <CommentIcon />}
  />
);

export const Share: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="share"
    icon={() => <ShareIcon />}
  />
);

export const Save: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="save"
    icon={() => <SaveIcon />}
  />
);

export const Tick: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="tick"
    icon={() => <TickIcon />}
  />
);

export const Search: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="search"
    icon={() => <SearchIcon />}
  />
);

export const Burger: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="burger"
    icon={() => <BurgerIcon />}
  />
);

export const Notification: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="notification"
    icon={() => <NotificationIcon />}
  />
);

export const Placeholder: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="placeholder"
    icon={() => <PlaceholderIcon />}
  />
);

export const Plus: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="plus"
    icon={() => <PlusIcon />}
  />
);

export const Settings: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="settings"
    icon={() => <SettingsIcon />}
  />
);

export const Edit: React.FC<IIconProps> = ({ text, className, onClick }) => (
  <BaseIcon
    text={text}
    className={className}
    onClick={onClick}
    iconType="edit"
    icon={() => <EditIcon />}
  />
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
  Edit,
};
