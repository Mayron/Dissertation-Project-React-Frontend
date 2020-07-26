import React, { useState, useContext, useEffect, createContext } from "react";
import { RouteComponentProps, useMatch } from "@reach/router";
import { SignalRContext } from "./signalr-provider";
import { invokeApiHub } from "../../api";
import { routeBuilder } from "../../utils";
import Loading from "../common/loading";
import Layout from "../layout";

interface IProjectContext {
  project: IProjectDetailsViewModel;
  projectId: string;
  createRoute: (...args: string[]) => string;
}

const defaultProject = {
  subscribed: false,
  projectId: "",
  name: "",
  totalSubscribers: 0,
  visibility: "Private",
  about: "",
  connectedGroupId: "",
  totalDownloads: 0,
  lastUpdated: "",
  isOwner: false,
};

export const ProjectContext = createContext<IProjectContext>({
  projectId: "",
  project: defaultProject,
  createRoute: (...args) => {
    return "";
  },
});

const ProjectProvider: React.FC<RouteComponentProps> = ({ children }) => {
  const projectIdMatch = useMatch("/p/:projectId/*");
  const projectId = projectIdMatch?.projectId as string;

  const [loadingProject, setLoadingProject] = useState(true);
  const [project, setProject] = useState<IProjectDetailsViewModel>({
    ...defaultProject,
    projectId: projectId,
  });

  const connection = useContext(SignalRContext);

  const handleApiResponse = (response: IPayloadEvent<IProjectDetailsViewModel>) => {
    setProject(response.payload || defaultProject);
    setLoadingProject(false);
  };

  useEffect(() => {
    if (!projectId || !loadingProject) return;

    if (!connection) {
      setLoadingProject(false);
      return;
    }

    invokeApiHub<IPayloadEvent<IProjectDetailsViewModel>>(
      connection,
      "FetchProject",
      handleApiResponse,
      () => setLoadingProject(false),
      projectId,
    );
  }, [connection, projectId, loadingProject]);

  return (
    <>
      {loadingProject ? (
        <Loading />
      ) : (
        <ProjectContext.Provider
          value={{
            project,
            projectId,
            createRoute: (...args: string[]) => routeBuilder("p", projectId, ...args),
          }}
        >
          <Layout
            id="projectPage"
            title={project?.name || "Project"}
            collapsed
            menuType="project"
          >
            {children}
          </Layout>
        </ProjectContext.Provider>
      )}
    </>
  );
};

export default ProjectProvider;
