import _ from "lodash";
import numeral from "numeral";

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

export const formatStatistic: (
  stat: number,
  label: string,
  plural?: boolean,
) => string = (stat, label, plural) => {
  let text = stat < 1000 ? stat.toString() : numeral(stat).format("0.00a");

  if (text.includes(".00")) {
    text = text.replace(".00", "");
  }

  if (plural) return `${text} ${label}s`;
  text = `${text} ${stat > 1 ? `${label}s` : label}`;
  return text;
};

export const createRoute: (
  prefix: string,
  id: string,
  slug?: string,
  ...args: string[]
) => string = (prefix, id, slug, ...args) => {
  let route = "";

  if (args.length > 0) route = `/${args.join("/")}`;

  if (slug) {
    return `/${prefix}/${id}/${slug}${route}`;
  } else {
    return `/${prefix}/${id}${route}`;
  }
};
