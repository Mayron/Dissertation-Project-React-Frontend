import _ from "lodash";
import numeral from "numeral";
import slugify from "slugify";

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
  label?: string,
  plural?: boolean,
) => string = (stat, label, plural) => {
  let text = stat < 1000 ? stat.toString() : numeral(stat).format("0.00a");

  if (text.includes(".00")) {
    text = text.replace(".00", "");
  }

  if (!label) return text;
  if (plural) return `${text} ${label}s`;
  text = `${text} ${stat > 1 ? `${label}s` : label}`;
  return text;
};

export const routeBuilder: (prefix: string, id: string, ...args: string[]) => string = (
  prefix,
  id,
  ...args
) => {
  let route = "";
  if (args.length > 0) route = `/${args.join("/")}`;
  return `/${prefix}/${id}${route}`;
};

export const getSlug = (value: string) => {
  return slugify(value, { lower: true });
};

export const getTimeAgoUtc = (value: string) => {
  if (value === "just now") {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDay();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    var timeAgo = Date.UTC(year, month, day, hours, minutes, seconds);
    return timeAgo;
  }

  const values = value.split(":").map((v) => parseInt(v));
  const year = values[0];
  const month = values[1] - 1;
  const day = values[2];
  const hours = values[3] - 1;
  const minutes = values[4];
  const seconds = values[5];

  var timeAgo = Date.UTC(year, month, day, hours, minutes, seconds);
  return timeAgo;
};
