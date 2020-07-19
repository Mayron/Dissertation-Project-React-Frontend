import React, { useState, useEffect, useContext } from "react";
import { invokeApiHub } from "../api";
import { SignalRContext } from "./signalr-provider";
import QuestionTooltip from "./common/question-tooltip";

interface IProjectConnectionListProps {
  value: string | null;
  onSelect: (groupId: string | null) => void;
}

interface IConnectionViewModel {
  id: string;
  name: string;
  visibility: string;
  available: boolean;
}

const GroupConnectionList: React.FC<IProjectConnectionListProps> = ({
  value,
  onSelect,
}) => {
  const connection = useContext(SignalRContext);
  const [groups, setGroups] = useState<IConnectionViewModel[]>([]);

  useEffect(() => {
    invokeApiHub<IPayloadEvent<IConnectionViewModel[]>>(
      connection,
      "FetchUserGroups",
      (ev) => {
        if (ev.payload) {
          setGroups(ev.payload);
        }
      },
    );
  }, [connection]);

  return (
    <>
      <ul className="striped">
        {groups.length === 0 && (
          <li>
            <p>You have not created any groups yet.</p>
          </li>
        )}
        {groups.map((group, key) => {
          <li key={key}>
            <p>
              {group.name} <span className="meta">[{group.visibility}]</span>
            </p>
            {group.available ? (
              <>
                {value === group.id ? (
                  <button
                    className="btn-secondary"
                    type="button"
                    onClick={() => onSelect(null)}
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={() => onSelect(group.id)}
                  >
                    Connect
                  </button>
                )}
              </>
            ) : (
              <QuestionTooltip id={`${group.id}-unavailable`}>
                <span className="count">?</span>
              </QuestionTooltip>
            )}
          </li>;
        })}
      </ul>

      {groups.length > 0 && (
        <div id="confirmConnection">
          <input type="submit" value="Confirm" className="btn-primary lg" />
        </div>
      )}
    </>
  );
};

export default GroupConnectionList;
