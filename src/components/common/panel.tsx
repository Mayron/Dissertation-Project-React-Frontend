import React from "react";

interface IPanelProps {
  title?: string;
}

const Panel: React.FC<IPanelProps> = ({ title, children }) => {
  return (
    <div className="panel">
      {title && (
        <header>
          <h3>{title}</h3>
        </header>
      )}
      {children}
    </div>
  );
};

export default Panel;
