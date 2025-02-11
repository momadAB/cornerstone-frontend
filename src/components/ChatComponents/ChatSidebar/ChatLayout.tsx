"use client";

import { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatPage from "@/app/chat/[chat_id]/page";

const ChatLayout = () => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const handleChatSelect = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="flex h-[90vh] bg-gray-900">
      <ChatSidebar
        onChatSelect={handleChatSelect}
        selectedChatId={selectedChatId}
      />
      <div className="w-full h-[90vh]">
        {selectedChatId ? (
          <ChatPage chatId={selectedChatId} />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
