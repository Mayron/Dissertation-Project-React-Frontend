import React, { useEffect, useContext, useState } from "react";
import { RouteComponentProps, useMatch } from "@reach/router";
import Filter from "../../common/filter";
import SearchBox from "../../common/search-box";
import Panel from "../../common/panel";
import PlaceholderProfilePic from "../../../images/placeholder-profile-pic.svg";
import { Link } from "gatsby";
import MoreDropdown from "../../common/more-dropdown";
import { SignalRContext } from "../../providers/signalr-provider";
import { AuthContext } from "../../providers/auth-provider";
import { invokeApiHub } from "../../../api";
import Loading from "../../common/loading";
import TimeAgo from "react-timeago";
import { getTimeAgoUtc, getSlug } from "../../../utils";

const FlexTable: React.FC = ({ children }) => {
  return (
    <div className="members">
      <header>
        <h5>Members</h5>
        <h5>Last online</h5>
        <h5>Contributions</h5>
      </header>
      <ul>{children}</ul>
    </div>
  );
};

interface IMemberRow {
  member: Member;
}

const MemberRow: React.FC<IMemberRow> = ({ member }) => {
  return (
    <li className="member-row">
      <div className="team-user">
        <MoreDropdown items={["View profile", "Remove from team"]} />
        <img src={PlaceholderProfilePic} alt="user" />
        <div>
          <Link to={`/u/${getSlug(member.name)}`} className="user">
            {member.name}
          </Link>
          <p>{member.teams}</p>
        </div>
      </div>
      <p>
        {member.lastOnline === "Online" ? (
          "Online"
        ) : (
          <TimeAgo date={getTimeAgoUtc(member.lastOnline)} />
        )}
      </p>
      <p>{member.contributions || "0"}</p>
    </li>
  );
};

type Member = {
  name: string;
  teams: string;
  lastOnline: string;
  contributions: number;
  memberId: string;
};

const TeamMembersView: React.FC<RouteComponentProps> = ({}) => {
  const teamIdMatch = useMatch("/p/:projectId/t/:teamId/*");
  const teamId = teamIdMatch?.teamId as string;

  const connection = useContext(SignalRContext);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (!connection || !token) return;

    invokeApiHub<IPayloadEvent<Member[]>>(
      connection,
      "FetchTeamMembers",
      (response) => {
        setLoading(false);
        if (response.payload) {
          setMembers(response.payload);
        }
      },
      () => setLoading(false),
      teamId,
    );
  }, [connection, token]);

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
          items={["User name", "Last online", "Contributions"]}
        />
      </div>
      <Panel>
        {loading ? (
          <Loading dimmer inline />
        ) : members.length === 0 ? (
          <p>This team has no members in it.</p>
        ) : (
          <FlexTable>
            {members.map((member, key) => (
              <MemberRow key={key} member={member} />
            ))}
          </FlexTable>
        )}
      </Panel>
    </section>
  );
};

export default TeamMembersView;
