import React, { useState } from "react";
import Layout from "../components/layout";
import { RouteComponentProps } from "@reach/router";
import TextField from "../components/widgets/text-field";
import { Link } from "gatsby";
import ReCAPTCHA from "react-google-recaptcha";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

const SignUpPage: React.FC<RouteComponentProps> = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO:  validation + get properties
    const email = "";
    const password = "";
    const displayName = "";

    try {
      // This will not trigger OnAuthStateChanged because we have not signed in yet.
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });

      // TODO: clear the form by setting values to "" in the text fields.
      // TODO: Or redirect?
    } catch (error) {}
  };

  return (
    <Layout title="Sign Up" id="signUp" menuType="auth" collapsed>
      <header>
        <h1>Sign up</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <TextField
          name="displayName"
          title="Display name"
          placeholder="Choose a display name"
          required
        />
        <TextField
          name="email"
          title="Email address"
          placeholder="Enter your email address"
          required
        />
        <TextField
          name="password"
          title="Password"
          placeholder="Choose a strong password"
          required
        />
      </form>

      <div id="recaptcha">
        <ReCAPTCHA sitekey="6LfIoKoZAAAAAMx0q6weVX2o1hjWGKi9-sNNHBdV" size="normal" />
      </div>

      <p className="meta">
        By clicking Sign Up, you agree to our{" "}
        <Link to="/user-agreement">User Agreement</Link>,{" "}
        <Link to="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link to="/cookie-policy">Cookie Policy</Link>.
      </p>
      <button className="btn-primary lg btn-signup">Sign Up</button>
      <footer>
        Already have an account? <Link to="/login">Log in</Link> instead.
      </footer>
    </Layout>
  );
};

export default SignUpPage;
