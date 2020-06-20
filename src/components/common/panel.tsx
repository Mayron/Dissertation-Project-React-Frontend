import React from "react";
import { Icons } from "../icons";

interface IPanelProps {
  title?: string;
  editable?: boolean;
  meta?: string;
  headerIcon?: () => React.ReactNode;
  highlight?: boolean;
  className?: string;
}

const Panel: React.FC<IPanelProps> = ({
  title,
  className,
  children,
  editable,
  meta,
  headerIcon,
  highlight,
}) => {
  const classList = ["panel"];
  if (className) classList.push(className);
  if (highlight) classList.push("highlight");

  return (
    <article className={classList.join(" ")}>
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
    </article>
  );
};

export default Panel;
