import React from "react";
import { Router, Redirect } from "@reach/router";
import UserPage from "../components/dynamic-pages/user";
import UserAllPostsView from "../components/user/views/user-all-posts";
import UserCommentsView from "../components/user/views/user-comments";
import UserMembershipsView from "../components/user/views/user-memberships";
import UserSubscriptionsView from "../components/user/views/user-subscriptions";
import UserSettingsView from "../components/user/views/user-settings";

const App = () => {
  return (
    <Router>
      <UserPage path="/u/:user">
        <UserAllPostsView path="/" />
        <UserCommentsView path="/comments" />
        <UserMembershipsView path="/memberships" />
        <UserSubscriptionsView path="/subscriptions" />
        <UserSettingsView path="/settings" />
      </UserPage>

      <Redirect default to="/404" />
    </Router>
  );
};

export default App;
