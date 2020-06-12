import React from "react";
import { RouteComponentProps } from "@reach/router";
import Panel from "../../common/panel";
import TextArea from "../../widgets/text-area";

import ProfilePic from "../../../images/placeholder-profile-pic.jpg";
import { Icons } from "../../icons";

const Comment = () => {
  return (
    <div className="comment">
      <img src={ProfilePic} alt="profile pic" className="profile-pic" />
      <div>
        <header>
          <a href="#" className="user">
            Skorm
          </a>
          <span>[Support]</span>
          <span className="meta">Today at 07:40</span>
        </header>
        <p>How are we doing today?</p>
      </div>
    </div>
  );
};

interface IChatChannelViewProps extends RouteComponentProps {
  channel?: string;
}

const ChatChannelView: React.FC<IChatChannelViewProps> = ({ channel }) => {
  return (
    <section id="group_cc">
      <header>
        <h2>#{channel}</h2>
        <p>A place for all general conversations to occur. Make yourself at home!</p>
      </header>

      <Panel>
        <div className="scroll">
          <Comment />
        </div>
        <TextArea id="chatEditBox" placeholder="Send a message">
          <div role="toolbar">
            <Icons.Plus />
          </div>
        </TextArea>
      </Panel>
    </section>
  );
};

export default ChatChannelView;
