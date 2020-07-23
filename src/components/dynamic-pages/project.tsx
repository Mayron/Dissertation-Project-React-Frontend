import React, { createContext, useState, useContext, useEffect } from "react";
import Layout from "../layout";
import { RouteComponentProps, useMatch } from "@reach/router";
import { SignalRContext } from "../signalr-provider";
import { invokeApiHub } from "../../api";
import Loading from "../common/loading";
import { createRoute } from "../../utils";

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
};

export const ProjectContext = createContext<IProjectContext>({
  projectId: "",
  project: defaultProject,
  createRoute: (...args) => {
    return "";
  },
});

const ProjectPage: React.FC<RouteComponentProps> = ({ children }) => {
  const projectIdMatch = useMatch("/p/:projectId/*");
  const projectId = projectIdMatch?.projectId as string;

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<IProjectDetailsViewModel>({
    ...defaultProject,
    projectId: projectId,
  });

  const connection = useContext(SignalRContext);

  const handleApiResponse = (response: IPayloadEvent<IProjectDetailsViewModel>) => {
    setProject(response.payload || defaultProject);
    setLoading(false);
  };

  useEffect(() => {
    if (!projectId || !loading) return;

    invokeApiHub<IPayloadEvent<IProjectDetailsViewModel>>(
      connection,
      "FetchProject",
      handleApiResponse,
      () => setLoading(false),
      projectId,
    );
  }, [connection, projectId]);

  return (
    <Layout
      id="projectPage"
      title={project?.name || "Project"}
      collapsed
      menuType="project"
      project={project}
    >
      {loading && projectId ? (
        <Loading />
      ) : (
        <>
          {project === defaultProject ? (
            <h1 className="unavailable">Project unavailable</h1>
          ) : (
            <>
              <ProjectContext.Provider
                value={{
                  project,
                  projectId,
                  createRoute: (...args: string[]) =>
                    createRoute("p", projectId, ...args),
                }}
              >
                {children}
              </ProjectContext.Provider>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default ProjectPage;
