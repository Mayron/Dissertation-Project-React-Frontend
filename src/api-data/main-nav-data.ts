// TODO: Replace with API data:

export interface ILinkData {
  name: string;
  url: string;
}

export interface IMenuData {
  projects: ILinkData[];
  memberships: ILinkData[];
  subscriptions: ILinkData[];
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
  ],
};

export default menuData;
