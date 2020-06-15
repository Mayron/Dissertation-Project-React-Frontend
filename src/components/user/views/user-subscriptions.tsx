import React from "react";
import { RouteComponentProps } from "@reach/router";
import User from "../user";

const UserSubscriptionsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <User.MenuBars.UserMenuBar />
      <section id="user_subs"></section>
    </>
  );
};

export default UserSubscriptionsView;
