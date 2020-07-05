import React, { createContext, useEffect, useContext, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { AuthContext } from "./auth-provider";
import { auth } from "../firebase/firebase.utils";

export const SignalRContext = createContext<signalR.HubConnection | null>(null);

const SignalRProvider: React.FC = ({ children }) => {
  const appUser = useContext(AuthContext);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    (async () => {
      const token = await auth.currentUser?.getIdToken();

      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/hub", { accessTokenFactory: () => token || "" })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      setConnection(connection);
      await connection.start().catch((error) => console.error(error));

      debugger;
      if (connection.state === signalR.HubConnectionState.Connected && appUser) {
        connection.send("ProtectedEndpoint");
      }
    })();

    return () => {
      if (!connection) return;
      connection.stop();
    };
  }, [appUser]);

  return <SignalRContext.Provider value={null}>{children}</SignalRContext.Provider>;
};

export default SignalRProvider;