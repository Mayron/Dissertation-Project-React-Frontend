export interface IOpportunity {
  title: string;
  description: string;
  url: string;
  projectTitle: string;
  author: string;
  createdAt: string;
}

export interface IOpportunityCategory {
  role: string;
  opportunities: IOpportunity[];
}

const OpportunitCategoriesData: IOpportunityCategory[] = [
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

export default OpportunitCategoriesData;
