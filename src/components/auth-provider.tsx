import React, { createContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

export const AuthContext = createContext<IAppUser | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [appUser, setAppUser] = useState<IAppUser | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((userAuth) => {
      if (userAuth === null) {
        setAppUser(null);
        return;
      }

      (async () => {
        const userRef = await createUserProfileDocument(userAuth);
        // const token = await userAuth.getIdToken();

        userRef?.onSnapshot((snapshot) => {
          const { displayName, email, createdAt } = snapshot.data() as IAppUser;

          setAppUser({
            id: snapshot.id,
            displayName,
            email,
            createdAt,
            // token,
          });
        });
      })();
    });
  }, []);

  return <AuthContext.Provider value={appUser}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
