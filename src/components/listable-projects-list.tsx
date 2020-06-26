import React from "react";

const ListableProjectsList = () => {
  return (
    <ul className="striped">
      <li>
        <p>
          LibMayronObjects <span className="meta">[public]</span>
        </p>
        <button className="btn-primary">List</button>
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
        <button className="btn-primary">List</button>
      </li>
    </ul>
  );
};

export default ListableProjectsList;
