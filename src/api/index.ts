import axios, { AxiosRequestConfig } from "axios";
import { auth } from "../firebase/firebase.utils";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 3000,
});

export const getAuthConfig = async (token?: string) => {
  if (!token) return;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } as AxiosRequestConfig;

  return config;
};

export default api;
