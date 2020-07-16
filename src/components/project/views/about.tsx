import React from "react";
import { RouteComponentProps, useParams } from "@reach/router";
import Panel from "../../common/panel";
import { Icons } from "../../icons";
import Card from "../../common/card";

const AboutView: React.FC<RouteComponentProps> = () => {
  const params = useParams();
  const projectId = params.projectId as string;

  return (
    <>
      <section id="projectAbout">
        <div className="row">
          <Panel title="About">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non tellus id
              leo tristique fermentum. Maecenas a orci nec dui porttitor consectetur
              interdum id elit. Morbi non velit leo. Fusce interdum purus at vestibulum
              ultricies. Phasellus laoreet tellus in magna sodales ullamcorper. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at suscipit
              lacus.
            </p>

            <div className="cards">
              <Card description="Check out our code base and create pull requests!">
                <Icons.Placeholder text="GitHub" />
              </Card>
              <Card description="New videos released daily where we discuss tips on how to use the UI.">
                <Icons.Placeholder text="YouTube" />
              </Card>
            </div>
          </Panel>
        </div>
      </section>
    </>
  );
};

export default AboutView;
