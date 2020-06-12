import React from "react";
import { Router, Redirect } from "@reach/router";
import NotFoundPage from "./404";
import ProjectPage from "../components/dynamic-pages/project";
import AboutView from "../components/project/views/about";

const App = () => {
  return (
    <Router>
      <ProjectPage path="/p/:slug">
        <AboutView path="/" />
        <Redirect default to="/p/404" />
      </ProjectPage>

      <NotFoundPage path="/p/404" />
      <NotFoundPage default />
    </Router>
  );
};

export default App;
