import React from "react";
import AuthProvider from "./src/components/providers/auth-provider";
import SignalRProvider from "./src/components/providers/signalr-provider";

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <SignalRProvider>{element}</SignalRProvider>
    </AuthProvider>
  );
};
