import React from "react";
import { Router, Redirect } from "@reach/router";
import GroupPage from "../components/dynamic-pages/group";
import NotFoundPage from "./404";
import PostsView from "../components/group/views/posts";
import AboutView from "../components/group/views/about";
import AnnouncementsCommunityView from "../components/group/views/announcements-community";
import AnnouncementsProjectView from "../components/group/views/announcements-projects";
import OpportunitiesView from "../components/group/views/opportunities";
import ChatChannelView from "../components/group/views/chat-channel";
import SettingsView from "../components/group/views/settings";
import ProjectsView from "../components/group/views/projects";
import ProjectsInCategoryView from "../components/group/views/projects-in-category";
import ListProjectView from "../components/group/views/list-project";
import ViewPostView from "../components/group/views/view-post-view";

const App = () => {
  return (
    <Router>
      <GroupPage path="/g/:groupId">
        <PostsView path="/" />
        <AboutView path="about" />
        <AnnouncementsCommunityView path="/announcements" />
        <AnnouncementsProjectView path="/announcements/projects" />
        <OpportunitiesView path="/opportunities" />
        <ChatChannelView path="/chat/:channel" />
        <SettingsView path="/settings" />
        <ViewPostView path="/post/:postId/*" />
      </GroupPage>

      <ProjectsView path="/g/:groupId/projects" />
      <ListProjectView path="/g/:groupId/list-project" />
      <ProjectsInCategoryView path="/g/:groupId/projects/:category" />

      <NotFoundPage path="/g/404" default />
    </Router>
  );
};

export default App;
