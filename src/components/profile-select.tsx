import React, { useState } from "react";
import ProfilePic from "../images/placeholder-profile-pic.jpg";
import { Icons } from "./icons";
import { Link } from "gatsby";
import UserPoints from "./user-points";

const ProfileSelect: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClicked = () => setOpen(false);

  return (
    <div id="profileSelect">
      <header onClick={() => setOpen(!open)}>
        <img src={ProfilePic} alt="profile pic" className="profile-pic" />
        <div>
          <p>Mayron</p>
          <UserPoints amount="14.6k" />
        </div>
        <Icons.Arrow open={open} onClick={() => setOpen(!open)} />
      </header>

      {open && (
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
            <Link to="/logout" onClick={handleLinkClicked}>
              Log Out
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileSelect;
