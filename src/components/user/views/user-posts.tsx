import React from "react";
import { RouteComponentProps } from "@reach/router";
import User from "../user";

const UserPostsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <User.MenuBars.UserMenuBar />
      <section id="user_p"></section>
    </>
  );
};

export default UserPostsView;
