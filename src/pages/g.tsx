import React from "react";
import { Router } from "@reach/router";
import GroupPageTemplate from "../templates/group";

const App = () => {
  return (
    <Router>
      <GroupPageTemplate path="/g/:slug" />
    </Router>
  );
};

export default App;
