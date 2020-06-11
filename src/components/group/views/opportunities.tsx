import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import SearchBox from "../../search-box";
import Filter from "../../common/filter";
import LinkPanel from "../../common/link-panel";
import PostFooter from "../../common/post-footer";
import { Icons } from "../../icons";

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

const OpportunitiesView: React.FC<RouteComponentProps> = () => {
  const opportunitCategories = [
    {
      role: "Graphics Designer",
      opportunities: [
        {
          title: "Front-end graphics designer wanted",
          description:
            "We are looking for a graphics designer to help with some of the new assets for upcoming or in development modules.",
          url: "/p/mayronui-gen6/opportunities/guid123",
          projectTitle: "MayronUI Gen6",
          author: "Mayron",
          createdAt: "2 days ago",
        },
      ],
    },
  ];

  const [categoriesShown, setCategoriesShown] = useState<number[]>([0]);

  return (
    <>
      <div className="spaced row">
        <SearchBox text="Search opportunities" />
        <Filter
          label="Filter by"
          tooltip="Filter by"
          selected={0}
          items={["All Projects", "Featured Only", "User Submitted"]}
        />
      </div>
      <section id="group_op">
        {opportunitCategories.map((cat, key) => {
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
                    meta={`Project: ${op.projectTitle}`}
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
      </section>
    </>
  );
};

export default OpportunitiesView;
