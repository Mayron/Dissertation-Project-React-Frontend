import React from "react";
import { RouteComponentProps } from "@reach/router";
import Panel from "../../common/panel";
import { Icons } from "../../icons";
import Card from "../../common/card";
import Filter from "../../common/filter";

interface IVersionCardProps {
  highlight?: boolean;
  version: string;
  summary: string;
}
const VersionCard: React.FC<IVersionCardProps> = ({ highlight, version, summary }) => {
  return (
    <li className="version-card row-20">
      <div>
        <span>Version</span>
        <p className="version">{version}</p>
      </div>
      <div>
        <span>Summary</span>
        <p className="summary">{summary}</p>
      </div>
      <div className="row-20">
        <Filter items={["File info", "Change log"]} label="More info" />
        <button type="button" className={highlight ? "btn-primary" : "btn-secondary"}>
          Download
        </button>
      </div>
    </li>
  );
};

const AllDownloadsView: React.FC<RouteComponentProps> = () => {
  return (
    <div id="project_ad">
      <section className="highlight">
        <header>
          <h4>Latest version (stable)</h4>
        </header>
        <ul>
          <VersionCard
            highlight
            version="16.2"
            summary="Updated to support WoW Shadowlands."
          />
        </ul>
      </section>

      <section>
        <header>
          <h4>Beta versions (unstable)</h4>
        </header>
        <ul>
          <VersionCard
            version="17.0b"
            summary="Includes the new cast bar module ready for testing."
          />
        </ul>
      </section>

      <section>
        <header>
          <h4>Previous versions</h4>
        </header>
        <ul>
          <VersionCard
            version="16.1"
            summary="Migration of database to newer DB version and new stuff that makes this a very long piece of text, is that okay?"
          />
          <VersionCard
            version="15.6.5"
            summary="Added new chat module and additional class changes."
          />
          <VersionCard
            version="15.3"
            summary="Integrated MayronUI DB to MUI_TimerBars."
          />
        </ul>
      </section>
    </div>
  );
};

export default AllDownloadsView;
