import React, { useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import Panel from "../../common/panel";
import { ProjectContext } from "../../providers/project-provider.tsx";

const AboutView: React.FC<RouteComponentProps> = () => {
  const { project } = useContext(ProjectContext);

  return (
    <>
      <section id="projectAbout">
        <div className="row">
          <Panel title="About">
            <p>{project.about || "There doesn't seem to be any thing here yet."}</p>
            {/* <div className="cards">
              <Card description="Check out our code base and create pull requests!">
                <Icons.Placeholder text="GitHub" />
              </Card>
              <Card description="New videos released daily where we discuss tips on how to use the UI.">
                <Icons.Placeholder text="YouTube" />
              </Card>
            </div> */}
          </Panel>
        </div>
      </section>
    </>
  );
};

export default AboutView;
