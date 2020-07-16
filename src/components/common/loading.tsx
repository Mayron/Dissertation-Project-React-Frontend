import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const Loading: React.FC = ({ children }) => (
  <Dimmer active inverted>
    <Loader size="huge" active>
      {children}
    </Loader>
  </Dimmer>
);

export default Loading;
