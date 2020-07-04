import React, { useState, useEffect } from "react";
import ProfilePic from "../images/placeholder-profile-pic.svg";
import { Icons } from "./icons";
import { Link } from "gatsby";
import UserPoints from "./user-points";
import { auth } from "../firebase/firebase.utils";

const ProfileSelect: React.FC = () => {
  const [shown, setShown] = useState<boolean>(false);
  const [mouseInside, setMouseInside] = useState<boolean>(false);

  const handleLinkClicked = () => setShown(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null;

    if (shown) {
      interval = setInterval(() => {
        if (!mouseInside && interval) {
          setShown(false);
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [shown, mouseInside]);

  return (
    <div
      id="profileSelect"
      onMouseEnter={() => setMouseInside(true)}
      onMouseLeave={() => setMouseInside(false)}
    >
      <header onClick={() => setShown(!shown)}>
        <img src={ProfilePic} alt="profile pic" className="profile-pic" />
        <div>
          <p>Mayron</p>
          <UserPoints amount="14.6k" />
        </div>
        <Icons.Arrow open={shown} onClick={() => setShown(!shown)} />
      </header>

      {shown && (
        <ul>
          <li>
            <Link to="/u/mayron" onClick={handleLinkClicked}>
              View Profile
            </Link>
          </li>
          <li>
            <Link to="/u/mayron/settings" onClick={handleLinkClicked}>
              Settings
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => auth.signOut()}>
              Log Out
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileSelect;
