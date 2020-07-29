import React from "react";
import { Loader, Dimmer, SemanticSIZES } from "semantic-ui-react";

interface ILoadingProps {
  dimmer?: boolean;
  size?: SemanticSIZES;
}
const Loading: React.FC<ILoadingProps> = ({ children, dimmer, size = "huge" }) => (
  <>
    {dimmer ? (
      <Dimmer active inverted>
        <Loader size={size} active>
          {children}
        </Loader>
      </Dimmer>
    ) : (
      <Loader size={size} active>
        {children}
      </Loader>
    )}
  </>
);

export default Loading;
