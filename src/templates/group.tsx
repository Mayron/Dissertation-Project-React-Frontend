import React from "react";
import Layout from "../components/layout";
import { RouteComponentProps } from "@reach/router";
import Group from "../components/group/group";

interface IGroupPageTemplateProps extends RouteComponentProps {
  slug?: string;
}

const GroupPageTemplate: React.FC<IGroupPageTemplateProps> = ({ slug, children }) => {
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
      <Group.SubMenus />
      {children}
    </Layout>
  );
};

export default GroupPageTemplate;
