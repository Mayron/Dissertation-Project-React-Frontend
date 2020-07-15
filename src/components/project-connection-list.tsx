import React, { useState } from "react";

interface IProjectConnectionListProps {
  name: string;
  data: FormValue<string[]>;
  onChange: (name: string, value: string[]) => void;
}

const ProjectConnectionList: React.FC<IProjectConnectionListProps> = ({
  name,
  data,
  onChange,
}) => {
  const handleConnect = (projectId: string, connect: boolean) => {
    const nextState = data.value.filter((c) => c !== projectId);

    if (connect) {
      nextState.push(projectId);
    }

    onChange(name, nextState);
  };

  return (
    <ul className="striped">
      <li>
        <p>
          MayronUI <span className="meta">[public]</span>
        </p>
        {data.value.includes("mayronui-gen6") ? (
          <button
            className="btn-secondary"
            data-value="mayronui-gen6"
            type="button"
            onClick={() => handleConnect("mayronui-gen6", false)}
          >
            Disconnect
          </button>
        ) : (
          <button
            className="btn-primary"
            data-value="mayronui-gen6"
            type="button"
            onClick={() => handleConnect("mayronui-gen6", true)}
          >
            Connect
          </button>
        )}
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
