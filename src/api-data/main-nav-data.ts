// TODO: Replace with API data:

export interface ILinkData {
  name: string;
  url: string;
}

export interface IMenuData {
  projects: ILinkData[];
  groups: ILinkData[];
  memberships: ILinkData[];
  subscriptions: ILinkData[];
  chatChannels: ILinkData[];
}

const menuData: IMenuData = {
  projects: [
    {
      name: "MayronUI Gen6",
      url: "/p/mayronui-gen6",
    },
    {
      name: "LibMayronDB",
      url: "/p/libmayrondb",
    },
    {
      name: "MayronUI Classic",
      url: "/p/mayronui-classic",
    },
  ],
  groups: [
    {
      name: "MayronUI Gen6",
      url: "/g/mayronui-gen6",
    },
    {
      name: "Mayron's Hideout",
      url: "/g/mayrons-hideout",
    },
  ],
  memberships: [
    {
      name: "MayronUI",
      url: "/g/mayronui",
    },
    {
      name: "WoW AddOn Dev",
      url: "/g/wow-addon-dev",
    },
    {
      name: "Games Programming",
      url: "/g/games-programming",
    },
    {
      name: "Support",
      url: "/g/support",
    },
  ],

  subscriptions: [
    {
      name: "Some YouTube Channel",
      url: "/p/some-youtube-channel",
    },
    {
      name: "University Project CE1021",
      url: "/p/university-project-ce1021",
    },
    {
      name: "SleepySack",
      url: "/p/sleepy-sack",
    },
    {
      name: "Content Workshop",
      url: "/p/content-workshop",
    },
    {
      name: "CoxCon 2021",
      url: "/p/coxcon-2021",
    },
    {
      name: "Building OpenSpark.io",
      url: "/p/building-openspark-io",
    },
  ],

  chatChannels: [
    {
      name: "#shadowlands-wow",
      url: "/g/mayronui-gen6/chat/shadowlands-wow",
    },
    {
      name: "#general",
      url: "/g/mayronui-gen6/chat/general",
    },
    {
      name: "#help-english",
      url: "/g/mayronui-gen6/chat/help-english",
    },
    {
      name: "#random",
      url: "/g/mayronui-gen6/chat/random",
    },
  ],
};

export default menuData;
