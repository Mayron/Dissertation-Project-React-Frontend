import React from "react";
import { navigateTo } from "gatsby";
import Panel from "./panel";

interface IPanelProps {
  title?: string;
  editable?: boolean;
  meta?: string;
  headerIcon?: () => React.ReactNode;
  highlight?: boolean;
  url: string;
}

const LinkPanel: React.FC<IPanelProps> = ({
  title,
  children,
  editable,
  meta,
  headerIcon,
  highlight,
  url,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.nodeName === "A") return;
    navigateTo(url);
  };

  return (
    <div className="panel-link" onClick={handleClick}>
      <Panel
        title={title}
        editable={editable}
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
