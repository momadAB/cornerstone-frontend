"use client";

import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatPage from "@/components/ChatComponents/ChatWindow/ChatPage";

const ChatLayout = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#112B45]">
      <div className="flex flex-1 h-full overflow-hidden">
        {" "}
        {/* Added overflow-hidden here */}{" "}
        <ChatSidebar
          onChatSelect={handleChatSelect}
          selectedChatId={selectedChatId}
          className="flex-shrink-0"
        />
        <div className="flex-1 h-full">
          {" "}
          {/* Added h-full */}{" "}
          {selectedChatId ? (
            <ChatPage chatId={selectedChatId} />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
