import React, { createContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

interface IAuthContext {
  token?: string;
  appUser?: IAppUser;
}

export const AuthContext = createContext<IAuthContext>({});

const AuthProvider: React.FC = ({ children }) => {
  const [value, setValue] = useState<IAuthContext>({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setValue({ appUser: value.appUser, token });
    }

    return auth.onAuthStateChanged((userAuth) => {
      if (userAuth === null) {
        setValue({});
        localStorage.removeItem("token");
        return;
      }

      (async () => {
        const userRef = await createUserProfileDocument(userAuth);
        let _token = localStorage.getItem("token") || undefined;

        if (!_token) {
          _token = await userAuth.getIdToken();
          localStorage.setItem("token", _token);
          setValue({ appUser: value.appUser, token: _token });
        }

        userRef?.onSnapshot((snapshot) => {
          const { displayName, email, createdAt } = snapshot.data() as IAppUser;
          setValue({
            token: _token,
            appUser: {
              id: snapshot.id,
              displayName,
              email,
              createdAt,
            },
          });
        });
      })();
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
