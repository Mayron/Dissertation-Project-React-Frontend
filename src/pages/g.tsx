import React from "react";
import { Router } from "@reach/router";
import GroupPageTemplate from "../templates/group";
import NotFoundPage from "./404";
import PostsSection from "../components/group/posts-section";
import ActivitySection from "../components/group/activity-section";
import AboutSection from "../components/group/about-section";
import RulesSection from "../components/group/rules-section";

const App = () => {
  return (
    <Router>
      <GroupPageTemplate path="/g/:slug">
        <PostsSection path="/" />
        <ActivitySection path="/activity" />
        <AboutSection path="/about" />
        <RulesSection path="/rules" />
      </GroupPageTemplate>
      <NotFoundPage default />
    </Router>
  );
};

export default App;
