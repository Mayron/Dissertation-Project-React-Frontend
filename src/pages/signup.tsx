import React, { useState } from "react";
import Layout from "../components/layout";
import { RouteComponentProps } from "@reach/router";
import TextField from "../components/widgets/text-field";
import { Link, navigate } from "gatsby";
import ReCAPTCHA from "react-google-recaptcha";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

interface IFormState {
  displayName: string;
  email: string;
  password: string;
  token: string | null;
}

const SignUpPage: React.FC<RouteComponentProps> = () => {
  const [error, setError] = useState<string>("");
  const [formValues, setFormValues] = useState<IFormState>({
    displayName: "",
    email: "",
    password: "",
    token: null,
  });

  const handleReCaptchaChange = (token: string | null) => {
    setFormValues({ ...formValues, token: token });

    if (token && error.startsWith("Verification")) {
      setError("");
    }
  };

  const handleFormInputChanged = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { displayName, email, password, token } = formValues;

    if (token === null) {
      setError(
        "Verification check failed. Please check the box to confirm you are not a robot.",
      );
      return;
    }

    if (displayName.length > 30) {
      setError("Display name must be less than 30 characters.");
      return;
    }

    if (displayName.length < 3) {
      setError("Display name must be at least 3 characters.");
      return;
    }

    if (email.length < 2 || email.indexOf("@") === -1) {
      setError("Invalid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      // This will not trigger OnAuthStateChanged because we have not signed in yet.
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });
      navigate("/");
    } catch (e) {
      setError((e as firebase.FirebaseError).message);
    }
  };

  return (
    <Layout title="Sign Up" id="signUp" menuType="auth" collapsed>
      <header>
        <h1>Sign up</h1>
      </header>
      {error.length > 0 && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          name="displayName"
          title="Display name"
          placeholder="Choose a display name"
          min={3}
          max={30}
          required
          onChange={handleFormInputChanged}
          value={formValues.displayName}
        />
        <TextField
          name="email"
          title="Email address"
          placeholder="Enter your email address"
          type="email"
          required
          onChange={handleFormInputChanged}
          value={formValues.email}
        />
        <TextField
          name="password"
          title="Password"
          type="password"
          placeholder="Choose a strong password"
          required
          min={6}
          onChange={handleFormInputChanged}
          value={formValues.password}
        />

        <div id="recaptcha">
          <ReCAPTCHA
            sitekey="6LfIoKoZAAAAAMx0q6weVX2o1hjWGKi9-sNNHBdV"
            size="normal"
            onChange={handleReCaptchaChange}
            onExpired={() =>
              setError(
                "Verification check expired. Please check the box to confirm you are not a robot.",
              )
            }
            onErrored={() => handleReCaptchaChange("continue")}
          />
        </div>

        <p className="meta">
          By clicking Sign Up, you agree to our{" "}
          <Link to="/user-agreement">User Agreement</Link>,{" "}
          <Link to="/privacy-policy">Privacy Policy</Link> and{" "}
          <Link to="/cookie-policy">Cookie Policy</Link>.
        </p>
        <input type="submit" className="btn-primary lg btn-signup" value="Sign Up" />
      </form>

      <footer>
        Already have an account? <Link to="/login">Log in</Link> instead.
      </footer>
    </Layout>
  );
};

export default SignUpPage;
