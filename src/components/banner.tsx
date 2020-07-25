import React, { useContext } from "react";
import Logo from "../images/openspark-logo.svg";
import { Icons } from "./icons";
import { Link } from "gatsby";
import ProfileSelect from "./profile-select";
import { AuthContext } from "./providers/auth-provider";

interface IBannerProps {
  onBurgerMenuClick: () => void;
}

const Banner: React.FC<IBannerProps> = ({ onBurgerMenuClick }) => {
  const { token } = useContext(AuthContext);

  return (
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

        {token ? (
          <ProfileSelect />
        ) : (
          <div id="authOptions">
            <Link to="/login" className="btn-secondary">
              Log In
            </Link>
            <Link to="/signup" className="btn-primary">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
