import { getToken } from "@/lib/token";
import axios from "axios";

// const baseUrl =
//   window.location.protocol === "https:"
//     ? `https://localhost:8080`
//     : `http://localhost:8080`;

const baseUrl = `http://localhost:8080`;

// Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to attach the Bearer token dynamically
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle errors during the request configuration
    return Promise.reject(error);
  }
);

export { axiosInstance, baseUrl };
