export interface IRecommendationItemData {
  name: string;
  type: string;
  description: string;
  amount?: string;
  role?: string;
  url: string;
}

export interface IRecommendationData {
  groups: IRecommendationItemData[];
  projects: IRecommendationItemData[];
  opportunities: IRecommendationItemData[];
}

const recommendationData: IRecommendationData = {
  groups: [
    {
      name: "Games Development",
      amount: "10.2k",
      description:
        "A community for those who love talking about games and games development.",
      type: "community",
      url: "/g/games-development",
    },
    {
      name: "Hackathon Thursdays",
      amount: "2.3k",
      description:
        "We raise money for charity through the power of programming! Come join us!",
      type: "group",
      url: "/g/hackathon-thursdays",
    },
    {
      name: "PHP for Beginners",
      amount: "324",
      description:
        "Learn PHP through practical challenges and collaborate as part of a community!",
      type: "group",
      url: "/g/php-for-beginners",
    },
  ],
  projects: [
    {
      name: "ElvUI",
      amount: "27.1k",
      description: "A popular UI replacement AddOn for World of Warcraft.",
      type: "project",
      url: "/p/elvui",
    },
  ],
  opportunities: [
    {
      name: "Minecraft Builder Mod",
      description: "Looking for a developer to help build interesting new features.",
      type: "opportunity",
      role: "Developer",
      url: "/o/minecraft-builder-mod/developer",
    },
  ],
};

export default recommendationData;
