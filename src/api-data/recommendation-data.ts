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
    {
      name: "CoxCon",
      amount: "61.9k",
      description: "Some crazy stuff relating to London in 2021 happening!",
      type: "project",
      url: "/p/coxcon-2021",
    },
    {
      name: "SleepySack",
      amount: "102.5k",
      description: "Warhammer lore and more. Come and join!",
      type: "project",
      url: "/p/sleepy-sack",
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
    {
      name: "MayronUI Gen6 Dev Recruitment!",
      description: "Due to popular demand, we need all the help we can get!",
      type: "opportunity",
      role: "Developer",
      url: "/o/mayronui-gen6/developer",
    },
  ],
};

export default recommendationData;
