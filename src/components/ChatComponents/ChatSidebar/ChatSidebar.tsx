"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getPossibleBusinessesToChatWith } from "@/app/api/actions/chat";
import Link from "next/link";
import DEFAULT_AVATAR from "../../../app/assets/ibrahim.png";
import DEFAULT_BUSINESS from "../../../app/assets/logo.jpeg";

import Image from "next/image";

interface ChatSidebarProps {
  onChatSelect: (chatId: number) => void;
  selectedChatId: number | null;
}

const dummyData = [
  {
    chatId: 1,
    businessName: "PixelCraft Studios",
    lastMessage: "Your design draft is ready for review!",
  },
  {
    chatId: 2,
    businessName: "Bean & Brews Café",
    lastMessage: "Your coffee subscription is expiring soon!",
  },
  {
    chatId: 3,
    businessName: "SwiftFix Repairs",
    lastMessage: "Your device repair is complete!",
  },
  {
    chatId: 4,
    businessName: "EchoTech Solutions",
    lastMessage: "Our team is reviewing your request.",
  },
  {
    chatId: 5,
    businessName: "Nomad Outfitters",
    lastMessage: "Check out our latest hiking gear collection!",
  },
];

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  onChatSelect,
  selectedChatId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [businesses, setBusinesses] = useState<BusinessDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await getPossibleBusinessesToChatWith();
        setBusinesses(data);
        setError(null);
      } catch (err) {
        setError("Failed to load chats. Please try again later.");
        console.error("Error fetching businesses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const filteredBusinesses = businesses.filter((business) =>
    business.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-sidebar w-60 bg-transparent p-4 h-full mt-5">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full p-2 pl-10 rounded-lg bg-[#232D4C] text-white outline-none border-white border-[1px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
          size={18}
        />
      </div>

      {isLoading ? (
        <div className="text-white text-center p-4">Loading chats...</div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : (
        <div className="space-y-2">
          {filteredBusinesses.map((business) => (
            <div
              key={business.chatId}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedChatId === business.chatId
                  ? "bg-[#182445] text-white"
                  : "bg-transparent text-white hover:bg-[#232D4C]"
              }`}
              onClick={() => onChatSelect(business.chatId)}
            >
              <div className="flex items-center space-x-3 relative">
                {/* Business Avatar (Background) */}
                <div className="absolute w-10 h-10 -top-1 -left-1 rounded-full ring-2 ring-gray-200/20 dark:border-gray-800 shadow-md overflow-hidden">
                  <Image
                    src={DEFAULT_BUSINESS} // Replace with actual business avatar path
                    alt={business.businessName}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full opacity-90"
                  />
                </div>

                {/* Profile Avatar (Foreground) */}
                <div className="relative z-10">
                  <Image
                    src={DEFAULT_AVATAR}
                    alt={business.businessName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full shadow-lg ring-2 ring-gray-200/20 dark:ring-gray-800/40"
                  />
                </div>

                {/* Business Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {business.businessName}
                  </p>
                  <p className="text-sm opacity-70 truncate">
                    {business.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {dummyData.map((business) => (
            <div
              key={business.chatId}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedChatId === business.chatId
                  ? "bg-[#182445] text-white"
                  : "bg-transparent text-white hover:bg-[#232D4C]"
              }`}
              onClick={() => onChatSelect(business.chatId)}
            >
              <div className="flex items-center space-x-3 relative">
                {/* Business Avatar (Background) */}
                <div className="absolute w-10 h-10 -top-1 -left-1 rounded-full ring-2 ring-gray-200/20 dark:border-gray-800 shadow-md overflow-hidden">
                  <Image
                    src={"/business/" + business.chatId + ".png"} // Replace with actual business avatar path
                    alt={business.businessName}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full opacity-90"
                  />
                </div>

                {/* Profile Avatar (Foreground) */}
                <div className="relative z-10">
                  <Image
                    src={"/profile/" + business.chatId + ".png"}
                    alt={business.businessName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full shadow-lg ring-2 ring-gray-200/20 dark:ring-gray-800/40"
                  />
                </div>

                {/* Business Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {business.businessName}
                  </p>
                  <p className="text-sm opacity-70 truncate">
                    {business.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;
