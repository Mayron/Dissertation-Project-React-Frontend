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
  // token: string;
}

declare interface IApiResponse {
  isValid: boolean;
  message: string;
}

declare interface IPostModel {
  id: string;
  groupId: string;
  title: string;
  body?: string;
  author: string;
  when: string;
}

declare interface INewPostModel {
  title: string;
  body?: string;
  groupId: string;
  authorUserId: string;
}

declare type FormValue<T> = {
  value?: T;
  error?: string;
};

declare type FormValues = {
  [key: string]: FormValue;
};
