import React, { useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import Panel from "../../common/panel";
import Group from "../group";
import { GroupContext } from "../../dynamic-pages/group";

const AboutView: React.FC<RouteComponentProps> = () => {
  const { group } = useContext(GroupContext);

  return (
    <>
      <Group.MenuBars.HomeMenuBar />
      <section id="groupAbout">
        <Panel title="About">
          <p>{group.about}</p>
          {/* <div className="cards">
              <Card description="Check out our code base and create pull requests!">
                <Icons.Placeholder text="GitHub" />
              </Card>
              <Card description="New videos released daily where we discuss tips on how to use the UI.">
                <Icons.Placeholder text="YouTube" />
              </Card>
            </div> */}
        </Panel>

        {/* <Panel title="Business Info">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non tellus id
            leo tristique fermentum. Maecenas a orci nec dui porttitor consectetur
            interdum id elit. Morbi non velit leo. Fusce interdum purus at vestibulum
            ultricies.
          </p>
        </Panel> */}
      </section>
    </>
  );
};

export default AboutView;
