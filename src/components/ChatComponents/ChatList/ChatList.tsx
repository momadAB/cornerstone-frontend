import type React from "react";
import ChatListItem from "./ChatListItem";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar: string;
}

interface ChatListProps {
  chats: Chat[];
}

const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  return (
    <div className="chat-list space-y-2">
      {chats.map((chat) => (
        <ChatListItem key={chat.id} {...chat} />
      ))}
    </div>
  );
};

export default ChatList;
