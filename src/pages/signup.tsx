import React from "react";
import Layout from "../components/layout";
import { RouteComponentProps } from "@reach/router";
import TextField from "../components/widgets/text-field";
import { Link } from "gatsby";
import ReCAPTCHA from "react-google-recaptcha";

const SignUpPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="Sign Up" id="signUp" menuType="auth" collapsed>
      <header>
        <h1>Sign up</h1>
      </header>
      <TextField title="Display name" placeholder="Choose a display name" required />
      <TextField title="Email address" placeholder="Enter your email address" required />
      <TextField title="Password" placeholder="Choose a strong password" required />

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
