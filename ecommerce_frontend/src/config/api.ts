
import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

// routes that MUST NOT get Authorization header
const PUBLIC_ROUTES = [
  "/api/auth",         
  "/api/seller/login",
  "/api/seller/verify",
];

api.interceptors.request.use((config) => {
  const url = config.url || "";

  // skip token for public routes
  if (PUBLIC_ROUTES.some((route) => url.startsWith(route))) {
    return config;
  }

  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;



