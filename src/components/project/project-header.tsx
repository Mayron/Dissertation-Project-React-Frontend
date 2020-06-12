import React from "react";

import PlaceholderProfilePic from "../../images/placeholder-profile-pic-lg.png";

const ProjectHeader = () => {
  return (
    <header id="projectHeader">
      <img src={PlaceholderProfilePic} alt="project logo" />
      <div>
        <h2>MayronUI Gen6</h2>
        <p className="meta">1,125 subscribers</p>
      </div>
      <button type="button" className="btn-primary">
        Subscribe
      </button>

      <div className="download-stats">
        <div>
          <p className="meta">256k downloads</p>
          <p className="meta">Last updated 2 days ago</p>
        </div>
        <button className="btn-primary">Download</button>
      </div>
    </header>
  );
};

export default ProjectHeader;
