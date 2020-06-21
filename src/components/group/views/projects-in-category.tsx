import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { Icons } from "../../icons";
import PlaceholderProjectPreview from "../../../images/placeholder-project-preview.jpg";
import { Link, navigateTo } from "gatsby";
import Layout from "../../layout";
import SearchBox from "../../common/search-box";
import Filter from "../../common/filter";

interface IProjectPreviewProps {
  name: string;
  description: string;
  author: string;
  subscribers: string;
  downloads: string;
  lastUpdated: string;
  url: string;
  onImageClick: (name: string, imgSrc: string) => void;
}

const ProjectPreview: React.FC<IProjectPreviewProps> = ({
  name,
  description,
  author,
  subscribers,
  downloads,
  lastUpdated,
  url,
  onImageClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!url) return;
    const target = e.target as HTMLElement;

    if (target.nodeName === "IMG") return;
    navigateTo(url);
  };

  return (
    <article className="proj-preview" onClick={handleClick}>
      <div className="img-preview">
        <img
          src={PlaceholderProjectPreview}
          alt="preview"
          onClick={() => onImageClick(name, PlaceholderProjectPreview)}
        />
        <Icons.Plus onClick={() => onImageClick(name, PlaceholderProjectPreview)} />
      </div>
      <div className="content">
        <h3>{name}</h3>
        <p>{description}</p>
        <ul className="row-20">
          <li>Author: {author}</li>
          <li>{subscribers} subscribers</li>
          <li>{downloads} downloads</li>
          <li>Last updated {lastUpdated}</li>
        </ul>
      </div>
    </article>
  );
};

interface ILargePreviewState {
  name: string;
  imgSrc: string;
}

const ProjectsInCategoryView: React.FC<RouteComponentProps> = () => {
  const [largePreview, setLargePreview] = useState<ILargePreviewState | null>(null);

  const handleSmallPreviewImageClick = (name: string, imgSrc: string) => {
    setLargePreview({ name, imgSrc });
  };

  const handleFaderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as HTMLDivElement;

    if (target && target.id === "fullscreenFader") {
      setLargePreview(null);
    }
  };

  return (
    <Layout id="group_pic" title="Test" collapsed menuType="group">
      {largePreview && (
        <div id="fullscreenFader" onClick={handleFaderClick}>
          <div className="content">
            <img src={largePreview.imgSrc} alt="large preview" />
            <div className="spaced">
              <p>{largePreview.name}</p>
              <button
                className="btn-primary"
                type="button"
                onClick={() => setLargePreview(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="projects">
        <Icons.Arrow
          text="Back to Project Categories"
          textDirection="right"
          direction="left"
          className="back-btn"
          onClick={() => navigateTo("/g/mayronui-gen6/projects")}
        />
        <header>
          <Icons.Placeholder />
          <div>
            <h2>Minimalistic AddOns (3)</h2>
            <p>
              UI's that are minimal in design. This is a very active space so please do
              not spam. Even this large description could be considered spam but it's here
              for testing purposes.
            </p>
          </div>
        </header>
        <div className="menubar" role="toolbar">
          <SearchBox placeholder="Search projects" />

          <div>
            <Filter
              items={["Last updated", "Most downloads", "Most subscribers"]}
              selected={0}
              label="Sort by"
            />
            <Link to="/g/mayronui-gen6/list-project" className="btn-primary">
              List Project
            </Link>
          </div>
        </div>

        <ProjectPreview
          name="MayronUI Gen6"
          description="This is some description about the project in question. It should be concise!"
          author="Mayron"
          subscribers="12.6k"
          downloads="256k"
          lastUpdated="3 days ago"
          url="/p/mayronui-gen6"
          onImageClick={handleSmallPreviewImageClick}
        />
        <ProjectPreview
          name="MayronUI Gen6"
          description="This is some description about the project in question. It should be concise!"
          author="Mayron"
          subscribers="12.6k"
          downloads="256k"
          lastUpdated="3 days ago"
          url="/p/mayronui-gen6"
          onImageClick={handleSmallPreviewImageClick}
        />
        <ProjectPreview
          name="MayronUI Gen6"
          description="This is some description about the project in question. It should be concise!"
          author="Mayron"
          subscribers="12.6k"
          downloads="256k"
          lastUpdated="3 days ago"
          url="/p/mayronui-gen6"
          onImageClick={handleSmallPreviewImageClick}
        />
      </section>
    </Layout>
  );
};

export default ProjectsInCategoryView;
