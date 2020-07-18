import { HubConnection } from "@microsoft/signalr";
import _ from "lodash";
import { toast } from "react-toastify";

export const addPendingMessage = (storage: Storage, message: PendingMessage) => {
  const messagesRaw = storage.getItem("messages");
  let pendingMessages: PendingMessage[];

  if (messagesRaw) {
    pendingMessages = JSON.parse(messagesRaw) as PendingMessage[];
    pendingMessages.push(message);
  } else {
    pendingMessages = [message];
  }

  storage.setItem("messages", JSON.stringify(pendingMessages));
};

export const usePendingMessages = (
  storage: Storage,
  callback: (p: PendingMessage) => void,
) => {
  const messagesRaw = storage.getItem("messages");

  if (!messagesRaw) return;

  const pendingMessages = JSON.parse(messagesRaw) as PendingMessage[];
  pendingMessages.forEach(callback);
  storage.removeItem("messages");
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
  if (!connection) return;

  if (currentConnectionId !== connection.connectionId) {
    connectionTimeout = false;
    currentConnectionId = connection.connectionId;
  }

  const callback = `${method}-${_.times(8, () =>
    ((Math.random() * 0xf) << 0).toString(16),
  ).join("")}`;

  let receivedReply = false;

  connection.invoke(method, callback, ...args);
  connection.on(callback, (response: T) => {
    receivedReply = true;
    connection.off(callback);
    onCallback(response);
  });

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
