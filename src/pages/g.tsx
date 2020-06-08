import React from "react";
import { Router, Redirect } from "@reach/router";
import GroupPage from "../components/dynamic-pages/group";
import NotFoundPage from "./404";
import PostsView from "../components/group/views/posts";
import AboutView from "../components/group/views/about";
import AnnouncementsCommunityView from "../components/group/views/announcements-community";
import AnnouncementsProjectView from "../components/group/views/announcements-projects";
import OpportunitiesView from "../components/group/views/opportunities";

const App = () => {
  return (
    <Router>
      <GroupPage path="/g/:slug">
        <PostsView path="/" />
        <AboutView path="/about" />
        <AnnouncementsCommunityView path="/announcements" />
        <AnnouncementsProjectView path="/announcements/projects" />
        <OpportunitiesView path="/opportunities" />

        <Redirect default to="/g/404" />
      </GroupPage>

      <NotFoundPage path="/g/404" />
      <NotFoundPage default />
    </Router>
  );
};

export default App;
