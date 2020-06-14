import React, { useState } from "react";
import { Icons } from "../icons";

interface IPanelSectionProps {
  title: string;
  collapsed?: boolean;
}

const PanelSection: React.FC<IPanelSectionProps> = ({ title, children, collapsed }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  return (
    <section className="panel-section">
      <header>
        <div>
          <Icons.Arrow open={!isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)}>
            <h4>{title}</h4>
          </Icons.Arrow>
        </div>
      </header>

      {!isCollapsed && <div>{children}</div>}
    </section>
  );
};

export default PanelSection;
