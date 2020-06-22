import React from "react";
import { navigateTo } from "gatsby";
import Panel from "./panel";

interface IPanelProps {
  title?: string;
  titleStyle?: React.CSSProperties;
  extraIcon?: () => React.ReactNode;
  meta?: string;
  headerIcon?: () => React.ReactNode;
  highlight?: boolean;
  url: string;
}

const LinkPanel: React.FC<IPanelProps> = ({
  title,
  titleStyle,
  children,
  extraIcon,
  meta,
  headerIcon,
  highlight,
  url,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.nodeName === "A" || target.nodeName === "BUTTON") return;
    navigateTo(url);
  };

  return (
    <div className="panel-link" onClick={handleClick}>
      <Panel
        title={title}
        titleStyle={titleStyle}
        extraIcon={extraIcon}
        meta={meta}
        headerIcon={headerIcon}
        highlight={highlight}
      >
        {children}
      </Panel>
    </div>
  );
};

export default LinkPanel;
