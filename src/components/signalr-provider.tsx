import React, { createContext, useEffect, useContext, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { AuthContext } from "./auth-provider";

export const SignalRContext = createContext<signalR.HubConnection | null>(null);

const SignalRProvider: React.FC = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    (async () => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/hub", { accessTokenFactory: () => token || "" })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect([0, 2000, 5000, 5000, 10000, 30000])
        .build();

      connection.onreconnected(() => setConnection(connection));
      connection.onclose(() => setConnection(null));

      await connection
        .start()
        .then(() => setConnection(connection))
        .catch((error) => {
          console.error(error);
          setConnection(null);
        });
    })();

    return () => {
      if (!connection) return;
      connection.stop();
    };
  }, [token]);

  return <SignalRContext.Provider value={connection}>{children}</SignalRContext.Provider>;
};

export default SignalRProvider;
