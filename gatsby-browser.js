import React from "react";
import AuthProvider from "./src/components/auth-provider";
import SignalRProvider from "./src/components/signalr-provider";

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <SignalRProvider>{element}</SignalRProvider>
    </AuthProvider>
  );
};
