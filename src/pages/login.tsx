import React, { useContext, useEffect, useState } from "react";
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
  const [error, setError] = useState<string>("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleFormInputChanged = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userAuth = await auth.signInWithEmailAndPassword(
        formValues.email,
        formValues.password,
      );
      navigate("/");
    } catch (e) {
      setError((e as firebase.FirebaseError).message);
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
      {error.length > 0 && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          title="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
          required
          value={formValues.email}
          onChange={handleFormInputChanged}
        />
        <TextField
          title="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          value={formValues.password}
          onChange={handleFormInputChanged}
        />

        <input type="submit" className="btn-primary lg btn-login" value="Log In" />
      </form>
      <p>
        Forgotten your <Link to="/recover/password">password</Link>?
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
