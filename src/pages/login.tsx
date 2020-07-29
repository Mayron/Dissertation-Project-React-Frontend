import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout";
import { RouteComponentProps } from "@reach/router";
import TextField from "../components/widgets/text-field";
import { Link, navigate, navigateTo } from "gatsby";
import GoogleAccountIcon from "../images/google-account-icon.png";

import { signInWithGoogle, auth } from "../firebase/firebase.utils";
import { AuthContext } from "../components/providers/auth-provider";

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

interface IFormState extends FormValues {
  email: FormValue<string>;
  password: FormValue<string>;
}

const LogInPage: React.FC<RouteComponentProps> = ({}) => {
  const { appUser } = useContext(AuthContext);

  const [error, setError] = useState<string>("");
  const [formValues, setFormValues] = useState<IFormState>({
    email: {},
    password: {},
  });

  useEffect(() => {
    if (appUser) navigateTo("/");
  }, [appUser]);

  const handleFormInputChanged = (name: string, value: any) => {
    setFormValues({ ...formValues, [name]: { value } });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formValues;

    if (!email.value) {
      const nextState = { ...formValues };
      nextState.email.error = "Please enter your email address.";
      setFormValues(nextState);
      return;
    }

    if (!password.value) {
      const nextState = { ...formValues };
      nextState.password.error = "Please enter your password.";
      setFormValues(nextState);
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email.value, password.value);
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
          data={formValues.email}
          onChange={handleFormInputChanged}
        />
        <TextField
          title="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          data={formValues.password}
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
