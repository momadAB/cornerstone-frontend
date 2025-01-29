"use client";

import { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getToken } from "@/lib/token";
import { sendMessageToChat, getChatMessages } from "@/app/api/actions/chat";
import { useParams } from "next/navigation";

interface User {
  id: number;
  firstName: string;
  bank: string;
  isYou: boolean;
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

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/1077/1077114.png";

export default function ChatPage() {
  const params = useParams();
  const chatId = parseInt(params.chat_id, 10);

  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch chat data whenever chatId changes
  useEffect(() => {
    if (!chatId) return; // Guard in case chatId is undefined or NaN

    async function loadChat() {
      try {
        const data = await getChatMessages(chatId);
        setChatData(data);
      } catch (error) {
        console.error("Failed to load chat:", error);
      }
    }

    loadChat();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatData) return;

    const newMessageObj: Message = {
      id: chatData.messages.length + 1,
      message: newMessage,
      sentAt: new Date().toISOString(),
      isYou: true,
      senderFirstName: chatData.businessOwner.firstName,
    };

    setChatData((prevData) => ({
      ...prevData!,
      messages: [...prevData!.messages, newMessageObj],
    }));
    setNewMessage("");
  };

  if (!chatData) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 px-72">
        {chatData.messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${
              message.isYou ? "flex-row-reverse space-x-reverse" : "flex-row"
            }`}
          >
            <div className="flex-shrink-0">
              <Image
                src={DEFAULT_AVATAR || "/placeholder.svg"}
                alt={`${message.senderFirstName}'s avatar`}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.isYou
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              <p className="font-bold">{message.senderFirstName}</p>
              <p>{message.message}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.sentAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-black">
        <div className="flex space-x-2 px-72">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 border border-yellow-400/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
            placeholder="Type your message..."
          />
          <Button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md transition duration-300"
          >
            <FaPaperPlane />
          </Button>
        </div>
      </form>
    </div>
  );
}
