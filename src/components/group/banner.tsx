import React from "react";
import BannerImagePlaceholder from "../../images/placeholder-banner.png";
import ProfilePicPlaceholder from "../../images/placeholder-profile-pic.svg";
import _ from "lodash";

interface IBannerProps {
  name: string;
  type: "group" | "community";
  members: string;
  category: string;
  logo: string;
  img: string;
}

const Banner: React.FC<IBannerProps> = ({
  name,
  type,
  members,
  category,
  logo,
  img,
  children,
}) => {
  return (
    <section id="groupBanner" role="banner" className="banner">
      <header>
        <div className="banner-title">
          <div>
            <h1>{`${name} ${_.startCase(_.toLower(type))}`}</h1>
            <p>
              <span>{members} members</span>
              <span>Rank 4</span>
            </p>
          </div>
          <button className="btn-primary">Join</button>
        </div>
        <div className="banner-category">
          <span>Category</span>
          <span>{category}</span>
        </div>
      </header>
      <div className="banner">
        <img src={BannerImagePlaceholder} alt="banner" className="banner-img" />
        <img src={ProfilePicPlaceholder} alt="group profile" className="profile-pic" />
        {children}
      </div>
    </section>
  );
};

export default Banner;
