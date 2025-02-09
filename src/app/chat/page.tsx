import React from "react";
import ChatSidebar from "@/components/ChatComponents/ChatSidebar/ChatSidebar";
import ChatWindow from "@/components/ChatComponents/ChatWindow/ChatWindow";

const ChatPage: React.FC = () => {
  return (
    <div className="chat-page flex h-screen bg-darkBlue">
      {/* Sidebar */}
      <div className="w-80 bg-darkBlueLight h-full">
        <ChatSidebar />
      </div>

      {/* Chat Window (Fills the Rest of the Space) */}
      <div className="flex-1 h-full">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;

