import React, { useContext, useEffect } from "react";
import Layout from "../components/layout";
import { RouteComponentProps } from "@reach/router";
import TextField from "../components/widgets/text-field";
import { Link, navigate } from "gatsby";
import GoogleAccountIcon from "../images/google-account-icon.png";

import { signInWithGoogle, auth } from "../firebase/firebase.utils";
import { AuthContext } from "../components/auth-provider";

interface IDividerProps {
  text: string;
}

const Divider: React.FC<IDividerProps> = ({ text }) => {
  return (
    <div className="divider">
      <p>{text}</p>
    </div>
  );
};

const LogInPage: React.FC<RouteComponentProps> = ({}) => {
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get state
    const email = "";
    const password = "";

    try {
      const userAuth = await auth.signInWithEmailAndPassword(email, password);
      //TODO: Clear state or redirect?
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title="Log In" id="login" menuType="auth" collapsed>
      <header>
        <h1>Log In</h1>
        <p className="meta">
          By logging in, you agree to our <Link to="/user-agreement">User Agreement</Link>
          , <Link to="/privacy-policy">Privacy Policy</Link> and{" "}
          <Link to="/cookie-policy">Cookie Policy</Link>.
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <TextField title="Email" placeholder="Enter your email" required />
        <TextField title="Password" placeholder="Enter your password" required />
      </form>

      <button className="btn-primary lg btn-login">Log In</button>
      <p>
        Forgotten your <Link to="/recover/email">email</Link> or{" "}
        <Link to="/recover/email">password</Link>?
      </p>
      <Divider text="OR" />
      <div id="socialSignIn">
        <button className="btn-secondary" onClick={signInWithGoogle}>
          <img src={GoogleAccountIcon} alt="Google Account" />
          Log in with Google
        </button>
      </div>
      <footer>
        New to OpenSpark? <Link to="/signup">Sign up</Link> today.
      </footer>
    </Layout>
  );
};

export default LogInPage;
