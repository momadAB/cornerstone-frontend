import React from "react";
import ChatList from "../ChatComponents/ChatList/ChatList";

const RecentMessages: React.FC = () => {
  const recentChats = [
    {
      id: 1,
      name: "Fajri Alhusaini",
      lastMessage: "How are you today?",
      time: "2 min ago",
      unreadCount: 0,
      avatar: "/images/avatar1.png",
    },
    {
      id: 2,
      name: "Abdulrahman Alfhadi",
      lastMessage: "How are you today?",
      time: "2 min ago",
      unreadCount: 0,
      avatar: "/images/avatar2.png",
    },
  ];

  return (
    <div className="recent-messages p-4 bg-darkBlue rounded-lg">
      <h3 className="text-white text-lg font-semibold mb-4">Recent Messages</h3>
      <ChatList chats={recentChats} />
    </div>
  );
};

export default RecentMessages;
