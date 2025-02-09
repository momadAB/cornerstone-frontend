"use client";

import type React from "react";
import { useState } from "react"; // ✅ Removed useEffect since it's not used
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "../ChatInput/ChatInput";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      sender: "Fajri Alhusaini",
      text: "Hello, I want a million dollar loan",
      time: "10:16 AM",
      isSent: false,
      date: "January 29, 2025",
    },
  ]);

  const addMessage = (text: string) => {
    const newMessage = {
      sender: "Me",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="chat-window flex flex-col flex-1 bg-darkBlue">
      <ChatHeader
        userName="Fajri Alhusaini"
        userAvatar="/images/fajri-avatar.png"
        onVideoCall={() => console.log("Starting Video Call...")}
      />
      <div className="flex-1 overflow-y-auto bg-chatPattern p-6">
        <MessageList messages={messages} />
      </div>
      <ChatInput onSendMessage={addMessage} />
    </div>
  );
};

export default ChatWindow;
