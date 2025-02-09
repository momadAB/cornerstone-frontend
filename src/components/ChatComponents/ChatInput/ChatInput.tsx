"use client";

import type React from "react";
import { useState } from "react";
import { Camera, Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="chat-input-container flex items-center bg-gray-800 p-3 rounded-b-lg h-16">
      {/* Camera Button */}
      <button className="p-3 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-all duration-200">
        <Camera size={22} />
      </button>

      {/* Input Field */}
      <input
        type="text"
        className="flex-1 p-3 rounded-lg bg-black text-white border border-gray-500 outline-none focus:ring-2 focus:ring-yellow-500 ml-3"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      {/* Send Button */}
      <button
        onClick={sendMessage}
        className="p-3 ml-3 bg-yellow-500 rounded-lg text-black font-bold hover:bg-yellow-400 transition-all duration-200"
      >
        <Send size={22} />
      </button>
    </div>
  );
};

export default ChatInput;
