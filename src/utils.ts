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
