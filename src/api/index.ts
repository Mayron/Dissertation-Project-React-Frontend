import axios, { AxiosRequestConfig } from "axios";
import { HubConnection } from "@microsoft/signalr";
import { toast } from "react-toastify";
import _ from "lodash";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 3000,
});

export default api;

export const getAuthConfig = async (token?: string) => {
  if (!token) return;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } as AxiosRequestConfig;

  return config;
};

let currentConnectionId: string | null = null;
let connectionTimeout = false;

export const invokeApiHub = <T>(
  connection: HubConnection | null,
  method: string,
  onCallback: (response: T) => void,
  onTimeout?: () => void,
  ...args: any[]
) => {
  if (!connection) {
    if (onTimeout) onTimeout();
    return;
  }

  if (currentConnectionId !== connection.connectionId) {
    connectionTimeout = false;
    currentConnectionId = connection.connectionId;
  }

  const callback = `${method}-${_.times(8, () =>
    ((Math.random() * 0xf) << 0).toString(16),
  ).join("")}`;

  let receivedReply = false;

  connection.on(callback, (response: T) => {
    receivedReply = true;
    connection.off(callback);
    onCallback(response);
  });

  if (args && args.length > 0) {
    args = args.filter((a) => a !== undefined || null);
  }

  if (!args || args.length === 0) {
    connection.invoke(method, callback);
  } else {
    connection.invoke(method, callback, ...args);
  }

  setTimeout(() => {
    if (!receivedReply) {
      connection.off(callback);

      if (!connectionTimeout) {
        toast.error(`Request timed out: ${method}`);
        connectionTimeout = true;
      }

      onTimeout && onTimeout();
    }
  }, 8000);
};
