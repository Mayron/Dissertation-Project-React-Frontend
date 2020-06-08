import React from "react";
import { RouteComponentProps } from "@reach/router";
import Panel from "../../common/panel";
import { Icons } from "../../icons";
import Card from "../../common/card";
import Group from "../group";

const AboutView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Group.MenuBars.HomeMenuBar />
      <section id="groupAbout">
        <div className="row">
          <Panel title="About" editable>
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
        <Panel title="Business Info" editable>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non tellus id
            leo tristique fermentum. Maecenas a orci nec dui porttitor consectetur
            interdum id elit. Morbi non velit leo. Fusce interdum purus at vestibulum
            ultricies.
          </p>
        </Panel>
      </section>
    </>
  );
};

export default AboutView;
