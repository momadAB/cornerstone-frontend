import { baseUrl, axiosInstance } from "./config"; // Define base URL and getHeaders for API requests

// Interface for the dashboard data
export interface DashboardData {
  notifications: null;
  pendingReview: {
    dinarsInReview: number;
    pending: number;
  };
  fiveMostRecentRequests: {
    requests: Array<{
      date: string;
      amount: number;
      businessName: string;
      id: number;
      title: string;
    }>;
  };
  fourMostRecentChats: Array<{
    id: number;
    otherUser: {
      id: number;
      firstName: string;
      bank: string;
      isYou: boolean;
    };
    latestMessage: string | null;
    latestMessageSenderIsYou: boolean;
  }>;
  recentHistory: Array<{
    date: string;
    amount: number;
    businessName: string;
    id: number;
    title: string;
    status: string;
  }>;
}

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const response = await axiosInstance.get("/user/v1/dashboard");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching dashboard data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
}
