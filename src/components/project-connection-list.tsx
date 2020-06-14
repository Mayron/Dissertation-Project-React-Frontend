import React from "react";

const ProjectConnectionList = () => {
  return (
    <ul className="striped">
      <li>
        <p>
          MayronUI <span className="meta">[public]</span>
        </p>
        <button className="btn-primary">Connect</button>
      </li>
      <li>
        <p>
          Uni Project <span className="meta">[private]</span>
        </p>
        <span className="count">?</span>
      </li>
      <li>
        <p>
          PawUI <span className="meta">[unlisted]</span>
        </p>
        <span className="count">?</span>
      </li>
      <li>
        <p>
          Game X <span className="meta">[public]</span>
        </p>
        <button className="btn-primary">Connect</button>
      </li>
    </ul>
  );
};

export default ProjectConnectionList;
