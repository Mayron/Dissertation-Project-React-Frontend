import React from "react";
import BannerImagePlaceholder from "../../images/placeholder-banner.png";
import ProfilePicPlaceholder from "../../images/placeholder-profile-pic-lg.png";
import { Icons } from "../icons";
import UserPoints from "../user-points";

interface IBannerProps {
  name: string;
  points: string;
}

const Banner: React.FC<IBannerProps> = ({ name, points }) => {
  return (
    <section id="userBanner" role="banner" className="banner">
      <img src={BannerImagePlaceholder} alt="banner" className="banner-img" />
      <img src={ProfilePicPlaceholder} alt="user profile" className="profile-pic" />
      <header>
        <div className="banner-title">
          <h1>{name}</h1>
          <UserPoints amount={points} />
        </div>
        <div>
          <Icons.Settings text="Settings" />
        </div>
      </header>
    </section>
  );
};

export default Banner;
