import React from "react";
import { RouteComponentProps } from "@reach/router";
import User from "../user";
import Panel from "../../common/panel";
import PlaceholderIcon from "../../../images/icons/placeholder.inline.svg";

const UserSubscriptionsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <User.MenuBars.UserMenuBar />
      <section id="user_subs">
        <p className="row">This user is subscribed to the following public projects:</p>
        <ul>
          <li>
            <Panel
              className="compact"
              title="ElvUI"
              headerIcon={() => <PlaceholderIcon />}
            >
              <p>A popular UI replacement AddOn for World of Warcraft.</p>
              <footer className="spaced">
                <span className="meta">27.1k subscribers</span>
                <button className="btn-secondary sm">Subscribe</button>
              </footer>
            </Panel>
          </li>
        </ul>
      </section>
    </>
  );
};

export default UserSubscriptionsView;
