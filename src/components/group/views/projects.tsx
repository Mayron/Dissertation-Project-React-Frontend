import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Icons } from "../../icons";
import PlaceholderBanner from "../../../images/placeholder-banner.png";
import PlaceholderLogo from "../../../images/placeholder-profile-pic.jpg";
import { Link } from "gatsby";
import Layout from "../../layout";
import Card from "../../common/card";

interface ICardProps {
  title: string;
  description: string;
  meta?: string;
  banner?: string;
  logo?: string;
}

const LargeCard: React.FC<ICardProps> = ({ title, description, meta, banner, logo }) => {
  return (
    <article className="card-lg">
      {(banner || logo) && (
        <div className="banner-wrapper">
          {banner && (
            <div className="card-banner">
              <img src={banner} alt="project banner" />
            </div>
          )}
          {logo && <img src={logo} className="card-logo" alt="project logo" />}
        </div>
      )}
      <header>
        <h4>{title}</h4>
        <p>{description}</p>
      </header>
      {meta && (
        <footer>
          <span className="meta">{meta}</span>
        </footer>
      )}
    </article>
  );
};

const ProjectsView: React.FC<RouteComponentProps> = () => {
  const editable = true;
  return (
    <Layout id="group_pjs" title="Test" collapsed menuType="group">
      <section id="featured">
        <header>
          <h2>Featured Projects</h2>
          {editable && <Icons.Edit text="Edit" />}
        </header>
        <div className="row-20">
          <LargeCard
            title="MayronUI Gen6"
            description="This is some text describing the project in the neatest way possible. Hopefully the box is big enough!"
            meta="256k downloads"
            banner={PlaceholderBanner}
            logo={PlaceholderLogo}
          />
          <LargeCard
            title="MayronUI Gen6"
            description="This is some text describing the project in the neatest way possible. Hopefully the box is big enough!"
            meta="256k downloads"
            banner={PlaceholderBanner}
            logo={PlaceholderLogo}
          />
          <LargeCard
            title="MayronUI Gen6"
            description="This is some text describing the project in the neatest way possible. Hopefully the box is big enough!"
            meta="256k downloads"
            banner={PlaceholderBanner}
            logo={PlaceholderLogo}
          />
        </div>
      </section>
      <section id="allProjects">
        <header>
          <div className="row-5 end">
            <h2>All Projects</h2>
            <span className="meta">- See what the community has been working on!</span>
          </div>

          <Link to="/g/mayronui-gen6/list-project" className="btn-primary">
            List Project
          </Link>
        </header>
        <div className="category">
          <h3>UI Compilations</h3>

          <div className="cat-grid">
            <Card
              description="UI's that are minimal in design. This is a very active space so please..."
              url="/g/mayronui-gen6/projects/minimalistic"
            >
              <Icons.Placeholder text="Minimalistic (2)" />
            </Card>
          </div>
        </div>
        <div className="category">
          <h3>Standalone AddOns</h3>
          <div className="cat-grid">
            <Card
              description="AddOns to control the appearance and functionality of Blizzard action bars."
              url="/g/mayronui-gen6/projects/action-bar-addons"
            >
              <Icons.Placeholder text="Action Bar AddOns (1)" />
            </Card>
            <Card
              description="Inventory mods to improve the inventory feature in WoW."
              url="/g/mayronui-gen6/projects/inventyory-addons"
            >
              <Icons.Placeholder text="Inventory AddOns (4)" />
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsView;
