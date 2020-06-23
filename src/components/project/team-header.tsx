import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import Project from "./project";
import { Icons } from "../icons";
import { navigate } from "gatsby";
import Layout from "../layout";
import TextArea from "../widgets/text-area";
import TextField from "../widgets/text-field";

const supportedColors = [
  "#212121",
  "#aa4400",
  "#00B518",
  "#7abf00",
  "#0D86FF",
  "#00b1ab",
  "#001891",
  "#f2c100",
  "#FF961D",
  "#F13F3F",
  "#F458F9",
  "#BE39FF",
];

interface IColorSelectionProps {
  title: string;
  onSelected: (selectedColor: string) => void;
}

const ColorSelection: React.FC<IColorSelectionProps> = ({ title, onSelected }) => {
  return (
    <div className="color-selection">
      <h4>{title}</h4>
      <div className="btns">
        {supportedColors.map((color, key) => (
          <button
            data-value={color}
            key={key}
            type="button"
            style={{ backgroundColor: color }}
            onClick={() => onSelected(color)}
          ></button>
        ))}
      </div>
    </div>
  );
};

interface ITeamHeaderProps extends RouteComponentProps {}

const TeamHeader: React.FC<ITeamHeaderProps> = ({ children }) => {
  const [teamColor, setTeamColor] = useState("#212121");

  const handleColorSelected = (selectedColor: string) => {
    setTeamColor(selectedColor);
  };

  return (
    <Layout id="projectPage" title="Team" collapsed menuType="project" subPage="team">
      <div className="spaced">
        <Icons.Arrow
          text="Back to Teams"
          textDirection="right"
          direction="left"
          className="back-btn"
          onClick={() => navigate("/p/mayronui-gen6/teams")}
        />

        <button className="btn-tertiary" type="button">
          Delete Team
        </button>
      </div>

      <section id="generalTeamSettings">
        <div className="row">
          <div className="name">
            <TextField
              placeholder="Team name"
              style={{ color: teamColor }}
              title="Team Name"
              required
              max={50}
            />
          </div>
          <div className="color">
            <ColorSelection title="Team Color" onSelected={handleColorSelected} />
          </div>
        </div>

        <div className="row">
          <TextArea placeholder="Team description" title="Description" max={250} />
        </div>
      </section>

      <Project.MenuBars.TeamsMenuBar />
      {children}
    </Layout>
  );
};

export default TeamHeader;
