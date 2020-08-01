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

export const postToApi = <T>(
  connection: HubConnection,
  token: string,
  url: string,
  data: any,
  onSuccess?: (payload: T) => void,
  onFailure?: (errors: string[]) => void,
) => {
  (async () => {
    let receivedReply = false;
    const config = await getAuthConfig(token);

    const callback = `${url}-${_.times(8, () =>
      ((Math.random() * 0xf) << 0).toString(16),
    ).join("")}`;

    connection.on(callback, (response: IPayloadEvent<T>) => {
      receivedReply = true;
      connection.off(callback);

      if (onSuccess && response.payload) onSuccess(response.payload);
      else if (response.errors) {
        response.errors.forEach((e) => toast.error(e));
        if (onFailure) onFailure(response.errors);
      }
    });

    data.connectionId = connection.connectionId;
    data.callback = callback;

    await api
      .post<IApiResponse>(url, data, config)
      .then((response) => {
        if (!(response.status === 202 && response.data.isValid)) {
          receivedReply = true;
          connection.off(callback);
          toast.error(response.data.message);
          if (onFailure) onFailure([response.data.message]);
        }
      })
      .catch((reason) => {
        receivedReply = true;

        if (reason.response.data && reason.response.data.errors) {
          const { errors } = reason?.response?.data;

          _.forOwn(errors, (value: string[]) => {
            value.forEach((v) => toast.error(v));
            if (onFailure) onFailure(value);
          });
        } else {
          const message = reason?.message || "Something unexpected occured.";
          toast.error(message);

          if (onFailure) onFailure([message]);
        }
      });

    setTimeout(() => {
      if (!receivedReply) {
        connection.off(callback);

        toast.error(`Request timed out: ${url}`);
        onFailure && onFailure(["Request timed out."]);
      }
    }, 8000);
  })();
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
