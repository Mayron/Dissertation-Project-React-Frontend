import React, { createContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

interface IAuthContext {
  token?: string;
  appUser?: IAppUser;
  checkingAuthState: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  checkingAuthState: true,
});

const AuthProvider: React.FC = ({ children }) => {
  const defaultToken = localStorage.getItem("token");

  const [value, setValue] = useState<IAuthContext>({
    token: defaultToken || undefined,
    checkingAuthState: true,
  });

  useEffect(() => {
    return auth.onIdTokenChanged((userAuth) => {
      localStorage.removeItem("token");

      if (!userAuth) {
        setValue({ checkingAuthState: false });
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
            checkingAuthState: false,
          });
        });
      })();
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
