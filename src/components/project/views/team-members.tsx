import React from "react";
import { RouteComponentProps } from "@reach/router";
import Filter from "../../common/filter";
import SearchBox from "../../common/search-box";
import Panel from "../../common/panel";
import PlaceholderProfilePic from "../../../images/placeholder-profile-pic.svg";
import { Link } from "gatsby";
import MoreDropdown from "../../common/more-dropdown";

interface IFlexTableProps {
  headers: string[];
  className: string;
}

const FlexTable: React.FC = ({ children }) => {
  return (
    <div className="members">
      <header>
        <h5>Members</h5>
        <h5>Last online</h5>
        <h5>Contribution</h5>
      </header>
      <ul>{children}</ul>
    </div>
  );
};

interface IMemberRow {
  user: string;
  teams: string;
  lastOnline: string;
  contributions: number;
}

const MemberRow: React.FC<IMemberRow> = ({ user, teams, lastOnline, contributions }) => {
  return (
    <li className="member-row">
      <div className="team-user">
        <MoreDropdown items={["View profile", "Remove from team"]} />
        <img src={PlaceholderProfilePic} alt="user" />
        <div>
          <Link to={`/u/${user.toLowerCase()}`} className="user">
            {user}
          </Link>
          <p>{teams}</p>
        </div>
      </div>
      <p>{lastOnline}</p>
      <p>{contributions}</p>
    </li>
  );
};

const TeamMembersView: React.FC<RouteComponentProps> = ({}) => {
  return (
    <section id="project_tm">
      <div className="spaced row">
        <div className="row-20">
          <SearchBox placeholder="Search users" />
          <button className="btn-secondary">Add User</button>
        </div>
        <Filter
          label="Sort by"
          tooltip="Sort by"
          selected={0}
          items={["User name", "Last online", "Contribution"]}
        />
      </div>
      <Panel>
        <FlexTable>
          <MemberRow
            user="Mayron"
            teams="Admin, Moderator, Support, Developer"
            lastOnline="16 hours ago"
            contributions={83}
          />
          <MemberRow
            user="Skorm"
            teams="Moderator, Support"
            lastOnline="1 week ago"
            contributions={32}
          />
          <MemberRow
            user="Pyro"
            teams="Developer"
            lastOnline="2 minutes ago"
            contributions={41}
          />
        </FlexTable>
      </Panel>
    </section>
  );
};

export default TeamMembersView;
