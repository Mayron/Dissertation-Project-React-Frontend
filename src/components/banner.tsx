import React from "react";
import Logo from "../images/openspark-logo.svg";
import FlameIcon from "../images/flame.svg";
import { Icons } from "./icons";

// TODO: Use Gatsby image:
import ProfilePic from "../images/placeholder-profile-pic.jpg";
import { Link } from "gatsby";

interface IProfileSelectProps {}

const ProfileSelect: React.FC<IProfileSelectProps> = () => (
  <div id="profileSelect">
    <img src={ProfilePic} alt="profile pic" className="profile-pic" />
    <div>
      <p>Mayron</p>
      <div>
        <span className="meta">14.6k</span>
        <img src={FlameIcon} alt="points" />
      </div>
    </div>
    <Icons.Arrow />
  </div>
);

interface IBannerProps {
  onBurgerMenuClick: () => void;
}

const Banner: React.FC<IBannerProps> = ({ onBurgerMenuClick }) => (
  <div id="banner" role="banner">
    <div>
      <Icons.Burger onClick={onBurgerMenuClick} />
      <Link to="/">
        <header>
          <img src={Logo} alt="logo" />
          <h1>OpenSpark.io</h1>
        </header>
      </Link>
    </div>

    <div>
      <Icons.Notification />
      <ProfileSelect />
    </div>
  </div>
);

export default Banner;
