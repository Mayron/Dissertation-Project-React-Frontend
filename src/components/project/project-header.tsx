import React, { useContext } from "react";
import PlaceholderProfilePic from "../../images/placeholder-profile-pic.svg";
import { formatStatistic, getTimeAgoUtc } from "../../utils";
import { ProjectContext } from "../providers/project-provider.tsx";
import TimeAgo from "react-timeago";

const ProjectHeader: React.FC = () => {
  const { project } = useContext(ProjectContext);

  const handleUnsubscribeClick = () => {};

  const handleSubscribeClick = () => {};

  return (
    <header id="projectHeader">
      <img src={PlaceholderProfilePic} alt="project logo" />
      <div>
        <h2>{project.name}</h2>
        <p className="meta">{formatStatistic(project.totalSubscribers, "subscriber")}</p>
      </div>

      {project.subscribed ? (
        <button type="button" className="btn-primary" onClick={handleSubscribeClick}>
          Subscribe
        </button>
      ) : (
        <button type="button" className="btn-tertiary" onClick={handleUnsubscribeClick}>
          Unsubscribe
        </button>
      )}

      <div className="download-stats">
        <div>
          <p className="meta">
            {formatStatistic(project.totalDownloads, "download", true)}
          </p>
          <p className="meta">
            Last updated <TimeAgo date={getTimeAgoUtc(project.lastUpdated)} />
          </p>
        </div>
        <button className="btn-primary">Download</button>
      </div>
    </header>
  );
};

export default ProjectHeader;
