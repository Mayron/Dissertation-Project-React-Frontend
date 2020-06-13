import React from "react";
import { Router, Redirect } from "@reach/router";
import NotFoundPage from "./404";
import ProjectPage from "../components/dynamic-pages/project";
import AboutView from "../components/project/views/about";
import AnnouncementsView from "../components/project/views/announcements";
import OpportunitiesView from "../components/project/views/opportunities";
import KnowledgeBaseView from "../components/project/views/knowledge-base";
import IssuesView from "../components/project/views/issues";
import AllDownloadsView from "../components/project/views/all-downloads";
import ConnectView from "../components/project/views/connect";

const App = () => {
  return (
    <Router>
      <ProjectPage path="/p/:slug">
        <AboutView path="/" />
        <ConnectView path="/connect" />
        <AnnouncementsView path="/announcements" />
        <OpportunitiesView path="/opportunities" />
        <KnowledgeBaseView path="/knowledge-base" />
        <IssuesView path="/issues" />
        <IssuesView path="/issues/closed" closed />
        <AllDownloadsView path="/all-downloads" />
        <Redirect default to="/p/404" />
      </ProjectPage>

      <NotFoundPage path="/p/404" />
      <NotFoundPage default />
    </Router>
  );
};

export default App;
