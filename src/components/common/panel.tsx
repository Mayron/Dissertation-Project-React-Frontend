import React from "react";
import { Icons } from "../icons";

interface IPanelProps {
  title?: string;
  titleStyle?: React.CSSProperties;
  extraIcon?: () => React.ReactNode;
  meta?: string;
  headerIcon?: () => React.ReactNode;
  highlight?: boolean;
  className?: string;
}

const Panel: React.FC<IPanelProps> = ({
  title,
  titleStyle,
  className,
  children,
  extraIcon,
  meta,
  headerIcon,
  highlight,
}) => {
  const classList = ["panel"];
  if (className) classList.push(className);
  if (highlight) classList.push("highlight");

  return (
    <article className={classList.join(" ")}>
      {extraIcon && extraIcon()}
      {title && (
        <header>
          {headerIcon && headerIcon()}
          <div>
            <h3 style={titleStyle}>{title}</h3>
            {meta && <span className="meta">{meta}</span>}
          </div>
        </header>
      )}
      {children}
    </article>
  );
};

export default Panel;
