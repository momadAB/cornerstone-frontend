"use client";

import type React from "react";
import { useState } from "react";
import { Search } from "lucide-react";
import ChatList from "../ChatList/ChatList";

const ChatSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const chats = [
    {
      id: 1,
      name: "Fajri Alhusaini",
      lastMessage: "How are you today?",
      time: "2 min ago",
      unreadCount: 3,
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 2,
      name: "Abdulrahman Alfhadi",
      lastMessage: "How are you today?",
      time: "2 min ago",
      unreadCount: 1,
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 3,
      name: "Mohammad Baqer",
      lastMessage: "How are you today?",
      time: "2 min ago",
      unreadCount: 0,
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 4,
      name: "Salem AL-Mutairi",
      lastMessage: "How are you today?",
      time: "2 min ago",
      unreadCount: 3,
      avatar: "/placeholder.svg?height=48&width=48",
    },
  ];

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-sidebar w-80 bg-darkBlueLight p-4">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>
      <ChatList chats={filteredChats} />
    </div>
  );
};

export default ChatSidebar;
