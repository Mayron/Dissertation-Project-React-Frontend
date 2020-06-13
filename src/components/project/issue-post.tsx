import React from "react";
import { Icons } from "../icons";

interface IIssuePostProps {
  header: string;
  author: string;
  when: string;
  labels?: string[];
  totalComments?: number;
  closed?: string;
}

const IssuePost: React.FC<IIssuePostProps> = ({
  header,
  author,
  when,
  labels = [],
  totalComments,
  closed,
}) => {
  return (
    <article>
      <input type="checkbox" />
      <header>
        <h4>{header}</h4>
        <div className="meta">
          <p>
            Submitted by {`${author} ${when}`}
            {closed && <strong>{` - ${closed}`}</strong>}
            {labels.map((label, key) => (
              <span key={key} className="label">
                {label}
              </span>
            ))}
          </p>
          {totalComments && <Icons.Comment text={totalComments.toString()} />}
        </div>
      </header>
    </article>
  );
};

export default IssuePost;
