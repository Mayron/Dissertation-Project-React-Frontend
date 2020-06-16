import React from "react";
import { RouteComponentProps } from "@reach/router";
import User from "../user";
import Panel from "../../common/panel";
import PlaceholderIcon from "../../../images/icons/placeholder.inline.svg";

const UserMembershipsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <User.MenuBars.UserMenuBar />
      <section id="user_m">
        <p className="row">
          This user is a member of the following public groups/communities:
        </p>
        <ul>
          <li>
            <Panel
              className="compact"
              title="Games Development"
              headerIcon={() => <PlaceholderIcon />}
            >
              <p>
                A community for those who love talking about games and games development.
              </p>
              <footer className="spaced">
                <span className="meta">10.2k members</span>
                <button className="btn-secondary sm">Join</button>
              </footer>
            </Panel>
          </li>
        </ul>
      </section>
    </>
  );
};

export default UserMembershipsView;
