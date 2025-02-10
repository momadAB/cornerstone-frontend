import { axiosInstance } from "./config";

export interface LoanHistoryResponse {
  status: string;
  requests: any[];
  totalRecords: number;
}

export async function fetchLoanHistory(
  page: number = 0,
  status: string = "",
  searchQuery: string = "",
  limit: number = 8
): Promise<LoanHistoryResponse> {
  try {
    // Build the query string. Adjust parameter names to match your backend API.
    const response = await axiosInstance.get(
      `/loan/bank/history?page=${page}&status=${status}&search=${searchQuery}&limit=${limit}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching loan history:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch loan history"
    );
  }
}
