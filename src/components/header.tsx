import React from "react";
import Logo from "../images/openspark-logo.svg";
import FlameIcon from "../images/flame.svg";
import { Icons } from "./icons";

// TODO: Use Gatsby image:
import ProfilePic from "../images/placeholder-profile-pic.jpg";

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

const Header: React.FC = () => (
  <div id="bannerHeader" role="banner">
    <div>
      <Icons.Burger />
      <header>
        <img src={Logo} alt="logo" />
        <h1>OpenSpark.io</h1>
      </header>
    </div>

    <div>
      <Icons.Notification />
      <ProfileSelect />
    </div>
  </div>
);

export default Header;
