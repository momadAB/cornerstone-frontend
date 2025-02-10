import type React from "react";

interface ChatListItemProps {
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar: string;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  name,
  lastMessage,
  time,
  unreadCount,
  avatar,
}) => {
  return (
    <div className="chat-list-item flex items-center p-3 cursor-pointer hover:bg-gray-700 rounded-lg transition-colors duration-200">
      <img
        src={avatar || "/placeholder.svg"}
        alt={name}
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-3 flex-1 min-w-0">
        <h4 className="text-white font-semibold truncate">{name}</h4>
        <p className="text-gray-400 text-sm truncate">{lastMessage}</p>
      </div>
      <div className="text-right flex flex-col items-end">
        <span className="text-gray-400 text-xs">{time}</span>
        {unreadCount > 0 && (
          <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full mt-1">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatListItem;
