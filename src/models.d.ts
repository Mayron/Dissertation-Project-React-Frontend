// ignores warnings from importing svgs
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare interface IKeyValuePair {
  key: string;
  value: string;
}

declare interface IAppUser {
  id: string;
  displayName: string;
  createdAt: Date;
  email: string;
}

declare interface IApiResponse {
  isValid: boolean;
  message: string;
}

declare interface IPostModel {
  postId: string;
  groupId: string;
  groupName: string;
  title: string;
  body?: string;
  authorDisplayName: string;
  when: string;
  totalComments: number;
  votes: number;
}

// retrieve the core group properties (does not include all properties)
declare interface IGroupDetailsViewModel {
  about?: string;
  name: string;
  visibility: string;
  categoryName: string;
  groupId: string;
  totalMembers: number;
  isMember: boolean;
}

declare interface IProjectDetailsViewModel {
  projectId: string;
  name: string;
  about?: string;
  totalSubscribers: number;
  visibility: string;
  connectedGroupId?: string;
  subscribed: boolean;
  totalDownloads: number;
  lastUpdated: string;
  isOwner: boolean;
}

declare interface INewPostModel {
  title: string;
  body?: string;
  groupId: string;
}

declare type FormValue<T> = {
  value?: T;
  error?: string;
};

declare type FormValues = {
  [key: string]: FormValue;
};

declare type PendingMessage = {
  success: boolean;
  message: string;
};

declare interface IPayloadEvent<T> {
  errors?: string[];
  payload?: T;
}

declare interface ISagaMessageEmittedEvent {
  message: string;
  success: boolean;
  args?: { [key: string]: string };
}

declare interface ITag {
  editing?: boolean;
  value: string;
}

declare type NamedEntity = {
  name: string;
  id: string;
};
