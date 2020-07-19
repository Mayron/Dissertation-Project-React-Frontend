import React, { createContext, useState, useContext, useEffect } from "react";
import Layout from "../layout";
import { RouteComponentProps, useMatch } from "@reach/router";
import { navigateTo } from "gatsby";
import slugify from "slugify";
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
  const slugMatch = useMatch("/p/:projectId/:slug/*");
  const projectId = projectIdMatch?.projectId as string;
  const slug = slugMatch?.slug;

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<IProjectDetailsViewModel>({
    ...defaultProject,
    projectId: projectId,
  });

  const connection = useContext(SignalRContext);

  const handleApiResponse = (response: IPayloadEvent<IProjectDetailsViewModel>) => {
    const projectName = response.payload?.name;

    if (!slug && projectName) {
      const url = `/p/${projectId}/${slugify(projectName, { lower: true })}`;
      navigateTo(url);
    } else {
      setProject(response.payload || defaultProject);
      setLoading(false);
    }
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
  }, [connection, projectId, slug]);

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
          {!project ? (
            <h1 className="unavailable">Project unavailable</h1>
          ) : (
            <>
              <ProjectContext.Provider
                value={{
                  project,
                  projectId,
                  createRoute: (...args: string[]) =>
                    createRoute("p", projectId, slug, ...args),
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
