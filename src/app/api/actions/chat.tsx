import { baseUrl, axiosInstance } from "./config"; // Define base URL and getHeaders for API requests
import { setToken, deleteToken } from "@/lib/token"; // Token management
import { redirect } from "next/navigation";

// Define a minimal interface for the response of sending a message
interface SendMessageResponse {}

interface BusinessDTO {
  businessName: string;
  chatId: number;
  profilePicture: string | null;
  lastMessage: string;
}

type BusinessesDTO = BusinessDTO[];

// Define a minimal interface for the overall Chat DTO
interface ChatDTO {
  id: number;
  banker: {
    id: number;
    firstName: string;
    bank: string;
    isYou: boolean;
  };
  businessOwner: {
    id: number;
    firstName: string;
    bank: string;
    isYou: boolean;
  };
  messages: Array<{
    id: number;
    message: string;
    senderFirstName: string;
    sentAt: string;
    isYou: boolean;
  }>;
}

export enum LoanResponseStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COUNTER_OFFER = "COUNTER_OFFER",
  RESCINDED = "RESCINDED",
  // Add other possible statuses if needed
}

export enum PaymentPeriod {
  ONE_YEAR = "ONE_YEAR",
  SIX_MONTHS = "SIX_MONTHS",
  TWO_YEARS = "TWO_YEARS",
  FIVE_YEARS = "FIVE_YEARS",
  // Add other possible periods if needed
}

export interface LoanRequest {
  id: number;
  loanResponseStatus: LoanResponseStatus | null;
  businessName: string;
  businessOwner: string;
  amount: number;
  paymentPeriod: PaymentPeriod;
  date: string; // ISO 8601 date string
}

export interface LoanRequestsDTO {
  requests: LoanRequest[];
  totalRecords: number;
  status: string;
}

/**
 * Send a message to a specific chat.
 *
 * Endpoint: POST http://localhost:8080/chat/[chat_id]/message
 * Headers: Authorization: Bearer <token>
 * Example body: { "content": "Hello" }
 */
export async function sendMessageToChat(
  chatId: number,
  content: string
): Promise<SendMessageResponse> {
  try {
    const response = await axiosInstance.post(
      `/chat/${chatId}/message`,
      { content } // JSON body
    );
    return response.data; // The server should return details about the new message
  } catch (error: any) {
    console.error("Error sending message:", error);
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
}

/**
 * Get messages (and other chat info) for a specific chat.
 *
 * Endpoint: GET http://localhost:8080/chat/[chat_id]
 * Headers: Authorization: Bearer <token>
 */
export async function getChatMessages(chatId: number): Promise<ChatDTO> {
  try {
    const response = await axiosInstance.get(`/chat/${chatId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching chat messages:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch chat messages"
    );
  }
}

export async function getPossibleBusinessesToChatWith(): Promise<BusinessesDTO> {
  try {
    const response = await axiosInstance.get(`/chat/businesses`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching chat messages:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch businesses"
    );
  }
}

export async function getPendingBusinessLoanRequests(
  businessOwnerId: number
): Promise<LoanRequestsDTO> {
  try {
    const response = await axiosInstance.get(
      `/loan/requests/business/${businessOwnerId}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching requests:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch loan requests"
    );
  }
}
