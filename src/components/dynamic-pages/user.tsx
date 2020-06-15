import React from "react";
import Layout from "../layout";
import { RouteComponentProps } from "@reach/router";
import User from "../user/user";

interface IUserPageProps extends RouteComponentProps {
  user?: string;
}

const UserPage: React.FC<IUserPageProps> = ({ user, children }) => {
  return (
    <Layout id="userPage" title="User">
      <User.Banner name={user} points="14.6k" />
      {children}
    </Layout>
  );
};

export default UserPage;
