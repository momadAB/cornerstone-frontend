import { baseUrl, axiosInstance } from "./config"; // Define base URL and getHeaders for API requests
import { setToken, deleteToken } from "@/lib/token"; // Token management
import { redirect } from "next/navigation";

// Define interfaces for data structures
interface SignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  civilId: string;
  mobileNumber: string;
  role: "BANKER" | "BUSINESS_OWNER" | "ADMIN";
  bank: string;
}

interface LoginCredentials {
  civilId: string;
  password: string;
}

interface ReturnedUser {
  status: string;
  message: string;
  accessToken: string;
  refreshToken: string;
}

// Auth-related actions
// Sign Up
export async function signUp(data: SignUpData): Promise<{ message: string }> {
  try {
    console.log(data);
    const response = await axiosInstance.post("/auth/v1/signup", data);
    await setToken(response.data.token); // Save the token
    return response.data;
  } catch (error: any) {
    console.error("Error during sign-up:", error);
    throw new Error(error.response?.data?.message || "Failed to sign up");
  }
}

// Sign In
export async function login(
  credentials: LoginCredentials
): Promise<ReturnedUser> {
  try {
    const response = await axiosInstance.post("/auth/v1/login", {
      civilId: credentials.civilId,
      password: credentials.password,
    });

    await setToken(response.data.accessToken);
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

// Logout
export async function logout(): Promise<void> {
  await deleteToken();
  redirect(`/login`);
}
