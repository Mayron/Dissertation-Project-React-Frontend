import React, { useEffect, useState } from "react";
import recommendationData, {
  IRecommendationItemData,
} from "../../api-data/recommendation-data";
import { Icons } from "../icons";
import { Link } from "gatsby";
import MenuHeader from "../menu-header";

interface IRecommendationProps {
  url: string;
  name: string;
  description: string;
  amount?: string;
  role?: string;
  canJoin: boolean;
  canSubscribe: boolean;
  canView: boolean;
}

const Recommendation: React.FC<IRecommendationProps> = ({
  url,
  name,
  description,
  amount,
  role,
  canJoin,
  canSubscribe,
  canView,
}) => (
  <Link to={url}>
    <section>
      <header>
        <Icons.Placeholder />
        <h4>{name}</h4>
      </header>
      <p>{description}</p>
      {canJoin && (
        <footer>
          <span>{`${amount} members`}</span>
          <button className="btn-secondary sm">Join</button>
        </footer>
      )}
      {canSubscribe && (
        <footer>
          {amount && <span>{`${amount} subscribers`}</span>}
          <button className="btn-secondary sm">Subscribe</button>
        </footer>
      )}
      {canView && (
        <footer>
          {role && <span>{`Looking for ${role}`}</span>}
          <button className="btn-secondary sm">View</button>
        </footer>
      )}
    </section>
  </Link>
);

interface IRecommendationSectionProps {
  id: string;
  title: string;
  items: IRecommendationItemData[];
}

const RecommendationSection: React.FC<IRecommendationSectionProps> = ({
  id,
  title,
  items,
}) => (
  <section id={id}>
    <MenuHeader title={title} />
    <ul>
      {items.map((item, key) => (
        <li key={key}>
          <Recommendation
            url={item.url}
            name={item.name}
            amount={item.amount}
            role={item.role}
            description={item.description}
            canJoin={item.type === "group" || item.type === "community"}
            canSubscribe={item.type === "project"}
            canView={item.type === "opportunity"}
          />
        </li>
      ))}
    </ul>
  </section>
);

const RecommendationsMenu: React.FC = () => {
  const [groups, setGroups] = useState<IRecommendationItemData[]>([]);
  const [projects, setProjects] = useState<IRecommendationItemData[]>([]);
  const [opportunities, setOpportunities] = useState<IRecommendationItemData[]>([]);

  useEffect(() => {
    setGroups(recommendationData.groups);
    setProjects([...recommendationData.projects]);
    setOpportunities(recommendationData.opportunities);
  }, []);

  return (
    <aside id="recommendMenu" role="complimentary">
      <RecommendationSection
        id="recommendedGroups"
        title="Groups &amp; Communities"
        items={groups}
      />
      <RecommendationSection id="recommendedProjects" title="Projects" items={projects} />
      <RecommendationSection
        id="recommendedOpportunities"
        title="Opportunities"
        items={opportunities}
      />
    </aside>
  );
};

export default RecommendationsMenu;
