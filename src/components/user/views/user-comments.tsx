import React from "react";
import { RouteComponentProps } from "@reach/router";
import User from "../user";

const UserCommentsView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <User.MenuBars.UserMenuBar />
      <section id="user_c"></section>
    </>
  );
};

export default UserCommentsView;
