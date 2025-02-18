import { getToken } from "@/lib/token";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
