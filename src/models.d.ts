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
