import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Icons } from "../../icons";
import PlaceholderBanner from "../../../images/placeholder-banner.png";
import PlaceholderLogo from "../../../images/placeholder-profile-pic.jpg";
import { Link } from "gatsby";
import Layout from "../../layout";
import Card from "../../common/card";

const ProjectsInCategoryView: React.FC<RouteComponentProps> = () => {
  return (
    <Layout id="group_pic" title="Test" collapsed menuType="group">
      <header>
        <h2>Action Bar AddOns</h2>

        <Link to="/g/mayronui-gen6/list-project" className="btn-primary">
          List Project
        </Link>
      </header>
    </Layout>
  );
};

export default ProjectsInCategoryView;
