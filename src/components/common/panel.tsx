import React from "react";
import { Icons } from "../icons";

interface IPanelProps {
  title?: string;
  editable?: boolean;
  meta?: string;
  headerIcon?: () => React.ReactNode;
  highlight?: boolean;
}

const Panel: React.FC<IPanelProps> = ({
  title,
  children,
  editable,
  meta,
  headerIcon,
  highlight,
}) => {
  return (
    <div className={`panel${highlight ? " highlight" : ""}`}>
      {editable && <Icons.Edit text="Edit" />}
      {title && (
        <header>
          {headerIcon && headerIcon()}
          <div>
            <h3>{title}</h3>
            {meta && <span className="meta">{meta}</span>}
          </div>
        </header>
      )}
      {children}
    </div>
  );
};

export default Panel;
