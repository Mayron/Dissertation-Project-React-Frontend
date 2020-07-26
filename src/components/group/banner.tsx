import React from "react";
import BannerImagePlaceholder from "../../images/placeholder-banner.png";
import ProfilePicPlaceholder from "../../images/placeholder-profile-pic.svg";
import _ from "lodash";
import { formatStatistic } from "../../utils";

interface IBannerProps {
  group: IGroupDetailsViewModel;
  logo: string;
  img: string;
}

const Banner: React.FC<IBannerProps> = ({ group, logo, img, children }) => {
  return (
    <section id="groupBanner" role="banner" className="banner">
      <header>
        <div className="banner-title">
          <div>
            <h1>{`${group.name} ${_.startCase(_.toLower("group"))}`}</h1>
            <p>
              <span>{formatStatistic(group.totalMembers, "member")}</span>
              {/* <span>Rank 4</span> */}
            </p>
          </div>
          {group.isMember ? (
            <button className="btn-primary">Join</button>
          ) : (
            <button className="btn-tertiary">Leave</button>
          )}
        </div>
        <div className="banner-category">
          <span>Category</span>
          <span>{group.categoryName}</span>
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
