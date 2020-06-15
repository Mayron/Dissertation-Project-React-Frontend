import React from "react";
import Logo from "../images/openspark-logo.svg";
import { Icons } from "./icons";
import { Link } from "gatsby";
import ProfileSelect from "./profile-select";

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
