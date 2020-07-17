import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

interface ILoadingProps {
  dimmer?: boolean;
}
const Loading: React.FC<ILoadingProps> = ({ children, dimmer }) => (
  <>
    {dimmer ? (
      <Dimmer active inverted>
        <Loader size="huge" active>
          {children}
        </Loader>
      </Dimmer>
    ) : (
      <Loader size="huge" active>
        {children}
      </Loader>
    )}
  </>
);

export default Loading;
