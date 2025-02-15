"use client";
import { useState, useEffect, useRef } from "react";
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
import { getUser } from "@/lib/token";
import VideoCallModal from "./VideoCallModal";

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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageIdRef = useRef<number | null>(null);
  const userScrolledRef = useRef(false);

  const shouldScrollToBottom = (data: ChatData) => {
    if (!data.messages.length) return false;

    const lastMessage = data.messages[data.messages.length - 1];

    // Always scroll if it's a new message from the current user
    if (lastMessage.isYou) {
      return true;
    }

    // Check if there's a new message from the other user
    if (lastMessageIdRef.current !== lastMessage.id) {
      // Only auto-scroll if the user hasn't manually scrolled up
      if (!userScrolledRef.current) {
        lastMessageIdRef.current = lastMessage.id;
        return true;
      }
    }

    return false;
  };

  // Handle scroll events
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const isScrolledToBottom =
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 50;

    userScrolledRef.current = !isScrolledToBottom;

    // If user scrolls to bottom, reset the scroll flag
    if (isScrolledToBottom) {
      userScrolledRef.current = false;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function loadChat() {
    try {
      const data = await getChatMessages(chatId);
      if (!data) return;

      // Update chat data and check if we should scroll
      setChatData((prevData) => {
        if (!prevData) {
          // First load - scroll to bottom
          setTimeout(scrollToBottom, 100);
          return data;
        }

        const shouldScroll = shouldScrollToBottom(data);
        if (shouldScroll) {
          setTimeout(scrollToBottom, 100);
        }

        return data;
      });
    } catch (error) {
      console.error("Failed to load chat:", error);
    }
  }

  // Initial chat data load and polling setup
  useEffect(() => {
    if (chatId) {
      loadChat();
      const pollInterval = setInterval(loadChat, 3000);

      // Load current user
      const loadCurrentUser = async () => {
        const user = await getUser();
        setCurrentUser(user);
      };
      loadCurrentUser();

      return () => clearInterval(pollInterval);
    }
  }, [chatId]);

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
    if (!newMessage.trim() || !chatData) return;

    const newMessageObj: Message = {
      id: Date.now(),
      message: newMessage,
      sentAt: new Date().toISOString(),
      isYou: true,
      senderFirstName: currentUser?.roles.includes("BANKER")
        ? chatData.banker.firstName
        : chatData.businessOwner.firstName,
    };

    // Update local state and scroll
    setChatData((prevData) => ({
      ...prevData!,
      messages: [...prevData!.messages, newMessageObj],
    }));

    // Reset user scroll flag when sending a message
    userScrolledRef.current = false;
    setTimeout(scrollToBottom, 100);

    try {
      await sendMessageToChat(chatId, newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!chatData) return <div className="text-white">Loading...</div>;

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleClickVideoCall = async () => {
    setIsVideoCallModalOpen(true);

    // Send a message indicating that the user is calling
    const callMessage = `${currentUser.banker.firstName} is calling`;

    const newMessageObj: Message = {
      id: Date.now(),
      message: callMessage,
      sentAt: new Date().toISOString(),
      isYou: true,
      senderFirstName: currentUser?.roles.includes("BANKER")
        ? chatData.banker.firstName
        : chatData.businessOwner.firstName,
    };

    // Update local state
    setChatData((prevData) => ({
      ...prevData!,
      messages: [...prevData!.messages, newMessageObj],
    }));

    // Reset user scroll flag and scroll to bottom
    userScrolledRef.current = false;
    setTimeout(scrollToBottom, 100);

    try {
      await sendMessageToChat(chatId, callMessage);
    } catch (error) {
      console.error("Failed to send call message:", error);
    }
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
            onClick={handleClickVideoCall}
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
        {chatData.messages.map((message) => {
          const isCallMessage = message.message.endsWith("is calling");

          if (isCallMessage) {
            return (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.isYou
                    ? "flex-row-reverse space-x-reverse"
                    : "flex-row"
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
                  className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl p-3 my-1 relative 
            bg-gradient-to-r from-yellow-400 to-yellow-500 text-black
            before:content-[''] before:absolute before:top-[12px] before:border-8 before:border-t-transparent before:border-b-transparent 
            ${
              message.isYou
                ? "before:border-l-[16px] before:border-r-0 before:right-[-8px] before:border-l-yellow-400"
                : "before:border-r-[16px] before:border-l-0 before:left-[-8px] before:border-r-yellow-400"
            }`}
                >
                  <div className="flex flex-col space-y-2">
                    <p className="font-bold">
                      {capitalize(message.senderFirstName)}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Video className="w-5 h-5" />
                      <p>Started a video call</p>
                    </div>
                    <Button
                      onClick={() => setIsVideoCallModalOpen(true)}
                      className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 w-auto"
                    >
                      {/* <Video className="w-4 h-4" /> */}
                      <span>Join Call</span>
                    </Button>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.sentAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          return (
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
                <p className="font-bold">
                  {capitalize(message.senderFirstName)}
                </p>
                <p>{message.message}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.sentAt).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
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
      <VideoCallModal
        isOpen={isVideoCallModalOpen}
        onClose={() => setIsVideoCallModalOpen(false)}
        roomId={chatId}
      />
    </div>
  );
}
