import React, { useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import ProjectProvider, { ProjectContext } from "../providers/project-provider.tsx";

const ProjectPageContent: React.FC = ({ children }) => {
  const { project } = useContext(ProjectContext);

  return (
    <>
      {!project.projectId ? (
        <h1 className="unavailable">Project unavailable</h1>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

const ProjectPage: React.FC<RouteComponentProps> = ({ children }) => {
  return (
    <ProjectProvider>
      <ProjectPageContent>{children}</ProjectPageContent>
    </ProjectProvider>
  );
};

export default ProjectPage;
