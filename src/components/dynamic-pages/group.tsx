import React from "react";
import Layout from "../layout";
import { RouteComponentProps } from "@reach/router";
import Group from "../group/group";

interface IGroupPageTemplateProps extends RouteComponentProps {
  slug?: string;
}

const GroupPage: React.FC<IGroupPageTemplateProps> = ({ slug, children }) => {
  return (
    <Layout id="groupPage" title="Test" collapsed menuType="group">
      <Group.Banner
        name="MayronUI"
        type="group"
        members="1.5k"
        category="Gaming"
        logo="logo.png"
        img="banner.jpg"
      >
        <ul className="social">
          <li>FB Icon here!</li>
        </ul>
      </Group.Banner>
      {children}
    </Layout>
  );
};

export default GroupPage;
