import React from "react";
import { Link } from "gatsby";

const KnowledgeBaseMenuBar: React.FC = ({ children }) => {
  return (
    <nav className="menu-bar" role="toolbar">
      <ul>
        <li>
          <Link to="/p/mayronui-gen6/knowledge-base" activeClassName="active">
            Wiki
          </Link>
        </li>
        <li>
          <Link to="/p/mayronui-gen6/knowledge-base/videos" activeClassName="active">
            Videos
          </Link>
        </li>
      </ul>
      {children}
    </nav>
  );
};

export default KnowledgeBaseMenuBar;
