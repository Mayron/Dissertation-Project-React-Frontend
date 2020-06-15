import React from "react";
import { RouteComponentProps } from "@reach/router";
import User from "../user";

const UserMembershipsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <User.MenuBars.UserMenuBar />
      <section id="user_m"></section>
    </>
  );
};

export default UserMembershipsView;
