import React, { useState } from "react";
import { Icons } from "./icons";
import { IOpportunityCategory } from "../api-data/opportunities-data";
import LinkPanel from "./common/link-panel";
import PostFooter from "./common/post-footer";

interface IOpportunityHeaderProps {
  text: string;
  amount: number;
  show: boolean;
  handleToggle: () => void;
}

const OpportunityHeader: React.FC<IOpportunityHeaderProps> = ({
  text,
  amount,
  show,
  handleToggle,
}) => {
  return (
    <header className="role">
      <h4>
        {text} ({amount})
      </h4>
      <Icons.Arrow open={show} onClick={handleToggle} />
    </header>
  );
};

interface IOpportunitiesListProps {
  categories: IOpportunityCategory[];
  shown: number[];
  showMeta?: boolean;
}

const OpportunitiesList: React.FC<IOpportunitiesListProps> = ({
  categories,
  shown,
  showMeta,
}) => {
  const [categoriesShown, setCategoriesShown] = useState<number[]>(shown);

  return (
    <>
      {categories.map((cat, key) => {
        const showCategory = categoriesShown.includes(key);

        return (
          <div key={key}>
            <OpportunityHeader
              text="Graphics Designer"
              amount={1}
              show={showCategory}
              handleToggle={() => {
                let newState = [...categoriesShown];

                if (showCategory) {
                  newState = newState.filter((c) => c !== key);
                } else {
                  newState.push(key);
                }

                setCategoriesShown(newState);
              }}
            />

            {showCategory &&
              cat.opportunities.map((op, key) => (
                <LinkPanel
                  url={op.url}
                  key={key}
                  title={op.title}
                  meta={showMeta && `Project: ${op.projectTitle}`}
                >
                  <p>{op.description}</p>
                  <PostFooter
                    postedBy={op.author}
                    when={op.createdAt}
                    showIcons={false}
                  />
                </LinkPanel>
              ))}
          </div>
        );
      })}
    </>
  );
};

export default OpportunitiesList;
