import React from "react";

import BurgerIcon from "../images/burger-icon.svg";
import Logo from "../images/openspark-logo.svg";
import NotificationIcon from "../images/notification-icon.svg";
import FlameIcon from "../images/flame.svg";
import Arrow from "../images/arrow.inline.svg";

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
    <img src={Arrow} alt="toggle" className="arrow" />
  </div>
);

const Header: React.FC = () => (
  <div id="bannerHeader" role="banner">
    <div>
      <img src={BurgerIcon} alt="toggle menu" />
      <header>
        <img src={Logo} alt="logo" />
        <h1>OpenSpark.io</h1>
      </header>
    </div>

    <div>
      <img src={NotificationIcon} alt="notifications" />
      <ProfileSelect />
    </div>
  </div>
);

export default Header;
