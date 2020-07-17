import React, { createContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

interface IAuthContext {
  token?: string;
  appUser?: IAppUser;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  loading: true,
});

const AuthProvider: React.FC = ({ children }) => {
  const defaultToken = localStorage.getItem("token");

  const [value, setValue] = useState<IAuthContext>({
    token: defaultToken || undefined,
    loading: true,
  });

  useEffect(() => {
    return auth.onIdTokenChanged((userAuth) => {
      localStorage.removeItem("token");

      if (!userAuth) {
        setValue({ loading: false });
        return;
      }

      (async () => {
        const userRef = await createUserProfileDocument(userAuth);
        let nextToken = await userAuth.getIdToken();

        userRef?.onSnapshot((snapshot) => {
          const { displayName, email, createdAt } = snapshot.data() as IAppUser;
          localStorage.setItem("token", nextToken);

          setValue({
            token: nextToken,
            appUser: {
              id: snapshot.id,
              displayName,
              email,
              createdAt,
            },
            loading: false,
          });
        });
      })();
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
