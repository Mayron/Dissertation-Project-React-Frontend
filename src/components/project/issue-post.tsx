import React from "react";
import { Icons } from "../icons";
import { Link } from "gatsby";

interface IIssuePostProps {
  header: string;
  author: string;
  when: string;
  flags?: string[];
  totalComments?: number;
  closed?: string;
  issueId: number;
}

const IssuePost: React.FC<IIssuePostProps> = ({
  header,
  author,
  when,
  flags = [],
  totalComments,
  closed,
  issueId,
}) => {
  return (
    <Link to={`/p/mayronui-gen6/issues/${issueId}`}>
      <article>
        <input type="checkbox" />
        <header>
          <h4>{header}</h4>
          <div className="meta">
            <p>
              Submitted by {`${author} ${when}`}
              {closed && <strong>{` - ${closed}`}</strong>}
              {flags.map((flag, key) => (
                <span key={key} className="flag">
                  {flag}
                </span>
              ))}
            </p>
            {totalComments && <Icons.Comment text={totalComments.toString()} />}
          </div>
        </header>
      </article>
    </Link>
  );
};

export default IssuePost;
