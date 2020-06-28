import React, { createContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

export const AuthContext = createContext<firebase.User | null>(null);

interface IAuthProviderProps {}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      createUserProfileDocument(user);
    });
  }, []);

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
