"use client";
import { useState, useEffect, useRef, use } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  sendMessageToChat,
  getChatMessages,
  getPendingBusinessLoanRequests,
  LoanRequest,
} from "@/app/api/actions/chat";
import { LoanRequestsModal } from "./LoanRequestsModal";
import { getToken, getUser } from "@/lib/token";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { WEBSOCKET_BASEURL } from "@/lib/utils";

let stompClient = null;

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/1077/1077114.png";

interface ChatPageProps {
  chatId: number;
}

interface User {
  id: number;
  firstName: string;
  bank: string;
  isYou: boolean;
  business: string;
  profilePicture: string;
  username: string;
}

interface Message {
  id: number;
  message: string;
  sentAt: string;
  isYou: boolean;
  senderFirstName: string;
}

interface ChatData {
  id: number;
  banker: User;
  businessOwner: User;
  messages: Message[];
}

export default function ChatPage({ chatId }: ChatPageProps) {
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [processedMessageIds] = useState(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("always chat", chatData);
  }, [chatData]);

  const initializeWebSocket = async () => {
    try {
      const token = await getToken();
      const user = await getUser();
      setCurrentUser(user);

      const socket = new SockJS(`${WEBSOCKET_BASEURL}?token=${token}`);
      stompClient = over(socket);
      stompClient.debug = null;

      if (stompClient.connected) {
        stompClient.disconnect();
      }

      return new Promise((resolve, reject) => {
        stompClient.connect(
          {},
          (frame) => {
            console.log("Connected to WebSocket");
            setTimeout(() => {
              try {
                const subscription = stompClient.subscribe(
                  "/user/topic/queue",
                  onMessageReceived
                );
                setSubscriptionId(subscription.id);
                setIsWebSocketConnected(true);
                resolve(true);
              } catch (err) {
                console.error("Subscription error:", err);
                reject(err);
              }
            }, 1000);
          },
          (error) => {
            console.error("WebSocket connection error:", error);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error("WebSocket initialization error:", error);
      throw error;
    }
  };

  // Initialize WebSocket connection
  useEffect(() => {
    let mounted = true;

    const connect = async () => {
      try {
        if (mounted) {
          await initializeWebSocket();
        }
      } catch (error) {
        console.error("Failed to initialize WebSocket:", error);
        if (mounted) {
          setTimeout(connect, 3000);
        }
      }
    };

    connect();

    return () => {
      mounted = false;
      if (subscriptionId && stompClient) {
        stompClient.unsubscribe(subscriptionId);
      }
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  // Handle incoming WebSocket messages
  const onMessageReceived = (payload) => {
    try {
      console.log("WebSocket message received:", payload);
      const data = JSON.parse(payload.body);
      console.log("Parsed WebSocket data:", data);

      // Create a more stable message ID using a combination of properties
      const messageKey = JSON.stringify({
        sender: data.senderName,
        recipient: data.recipientName,
        message: data.message,
        business: data.businessName,
      });

      console.log("Generated message key:", messageKey);

      // Skip if we've already processed this message
      if (processedMessageIds.has(messageKey)) {
        console.log("Duplicate message detected, skipping. Key:", messageKey);
        return;
      }

      // Add to processed messages
      processedMessageIds.add(messageKey);
      console.log("Added message key to processed set:", messageKey);

      const newMessageObj: Message = {
        id: Date.now(),
        message: data.message,
        sentAt: new Date().toISOString(),
        isYou: data.senderName === currentUser?.sub,
        senderFirstName: data.senderFirstName, // Use the received first name
      };

      console.log("Created message object:", newMessageObj);

      setChatData((prevData) => {
        if (!prevData) {
          console.log("No previous chat data available");
          return prevData;
        }
        console.log("Updating chat with new message");
        return {
          ...prevData,
          messages: [...prevData.messages, newMessageObj],
        };
      });
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
    }
  };

  // Fetch initial chat data
  useEffect(() => {
    async function loadChat() {
      try {
        console.log("Fetching chat data for chatId:", chatId);
        const data = await getChatMessages(chatId);
        console.log("Received chat data:", data);
        if (!data) {
          console.error("No chat data received");
          return;
        }
        setChatData(data);
      } catch (error) {
        console.error("Failed to load chat:", error);
      }
    }

    if (chatId) {
      loadChat();
    } else {
      console.error("No chatId provided");
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatData?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchLoanRequests = async () => {
    if (chatData?.businessOwner?.id) {
      try {
        const data = await getPendingBusinessLoanRequests(
          chatData.businessOwner.id
        );
        setLoanRequests(data);
      } catch (error) {
        console.error("Failed to fetch loan requests:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatData || !isWebSocketConnected) return;

    console.log("chatdata: ", chatData);

    const newMessageObj: Message = {
      id: Date.now(),
      message: newMessage,
      sentAt: new Date().toISOString(),
      isYou: true,
      senderFirstName: currentUser?.roles.includes("BANKER")
        ? chatData.banker.firstName
        : chatData.businessOwner.firstName, // Add this line
    };

    // Optimistically update UI
    setChatData((prevData) => ({
      ...prevData!,
      messages: [...prevData!.messages, newMessageObj],
    }));

    try {
      // Send message through REST API
      await sendMessageToChat(chatId, newMessage);

      console.log(currentUser);

      // Send message through WebSocket
      const chatMessage = {
        senderName: currentUser?.sub,
        recipientName: chatData.businessOwner.username,
        message: newMessage,
        senderRole: currentUser?.roles,
        type: "NEW_MESSAGE",
        businessName: chatData.businessOwner.business,
        senderFirstName: currentUser?.roles.includes("BANKER")
          ? chatData.banker.firstName
          : chatData.businessOwner.firstName, // Add this line
      };

      console.log("Sending WebSocket message:", chatMessage);
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      console.log("WebSocket message sent");
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setNewMessage("");
  };

  if (!chatData) return <div className="text-white">Loading...</div>;

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="flex flex-col h-[calc(100%-1.25rem)] bg-gray-900 border-[#7B7B7B] border-l-2 border-b-2 border-t-2 rounded-tl-lg mt-8 z-30">
      <div className="flex items-center justify-between px-6 py-4 bg-[#0F1624] border-b border-gray-700 rounded-tl-xl">
        <div className="flex items-center space-x-4">
          <Image
            src={DEFAULT_AVATAR}
            alt={`${chatData.businessOwner.firstName}'s avatar`}
            width={48}
            height={48}
            className="rounded-full shadow-lg ring-2 ring-gray-200/20 dark:ring-gray-800/40"
          />
          <div>
            <h2 className="text-xl font-semibold text-white">
              {chatData.businessOwner.business}
            </h2>
            <p className="text-sm text-gray-400">
              {chatData.businessOwner.firstName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* WebSocket Status Indicator */}
          <div
            className={`px-2 py-1 rounded text-sm ${
              isWebSocketConnected ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isWebSocketConnected ? "Connected" : "Disconnected"}
          </div>
          <Button
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-yellow-400"
            onClick={() => {
              fetchLoanRequests();
              setIsLoanModalOpen(true);
            }}
          >
            View Loan Requests
          </Button>
          <Button
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 border-gray-600 p-2"
            onClick={() => console.log("Video call clicked")}
          >
            <Video className="text-yellow-400 w-28 h-28" />
          </Button>
        </div>
      </div>

      <LoanRequestsModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
        requests={loanRequests}
      />

      <div className="flex-1 min-w-0 bg-[url('/ChatBackground.png')] bg-repeat pt-5 px-5 overflow-y-auto">
        {chatData.messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${
              message.isYou ? "flex-row-reverse space-x-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex-shrink-0 
              ${message.isYou ? "ml-2" : "mr-2"}`}
            >
              <Image
                src={DEFAULT_AVATAR}
                alt={`${message.senderFirstName}'s avatar`}
                width={40}
                height={40}
                className="rounded-full shadow-lg ring-2 ring-gray-200/20 dark:ring-gray-800/40"
              />
            </div>
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl p-3 my-1 relative px-3 
                ${
                  message.isYou
                    ? "bg-[#FFD700] text-black before:border-[#FFD700] before:right-[-8px]"
                    : "bg-[#E6E5EB] text-black before:border-[#E6E5EB] before:left-[-8px]"
                } before:content-[''] before:absolute before:top-[12px] before:border-8 before:border-t-transparent before:border-b-transparent 
                ${
                  message.isYou
                    ? "before:border-l-[16px] before:border-r-0"
                    : "before:border-r-[16px] before:border-l-0"
                }`}
            >
              <p className="font-bold">{capitalize(message.senderFirstName)}</p>
              <p>{message.message}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.sentAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-[#0F1624]">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 h-10 px-3 bg-gray-800 border border-yellow-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
            placeholder="Type your message..."
          />
          <Button
            type="submit"
            className="h-10 w-16 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black rounded-md transition duration-300"
          >
            <FaPaperPlane className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
