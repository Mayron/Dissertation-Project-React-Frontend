import React from "react";
import { Router, Redirect } from "@reach/router";
import NotFoundPage from "./404";
import UserPage from "../components/dynamic-pages/user";
import UserPostsView from "../components/user/views/user-posts";
import UserCommentsView from "../components/user/views/user-comments";
import UserMembershipsView from "../components/user/views/user-memberships";
import UserSubscriptionsView from "../components/user/views/user-subscriptions";
import UserSettingsView from "../components/user/views/user-settings";

const App = () => {
  return (
    <Router>
      <UserPage path="/u/:user">
        <UserPostsView path="/" />
        <UserCommentsView path="/comments" />
        <UserMembershipsView path="/memberships" />
        <UserSubscriptionsView path="/subscriptions" />
        <UserSettingsView path="/settings" />
        <Redirect default to="/p/404" />
      </UserPage>

      <NotFoundPage path="/p/404" />
      <NotFoundPage default />
    </Router>
  );
};

export default App;
