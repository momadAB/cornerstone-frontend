import type React from "react";
import { Video } from "lucide-react";

interface ChatHeaderProps {
  userName: string;
  userAvatar?: string;
  isOnline?: boolean;
  onVideoCall: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  userName,
  userAvatar = "/default-avatar.png",
  isOnline = true,
  onVideoCall,
}) => {
  return (
    <div className="chat-header flex justify-between items-center px-6 py-3 bg-gray-800 shadow-md rounded-t-lg h-16">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={userAvatar}
            alt={`${userName} Avatar`}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            } border-2 border-gray-800`}
            aria-label={isOnline ? "Online" : "Offline"}
          />
        </div>
        <h3 className="text-white font-semibold text-md">{userName}</h3>
      </div>

      {/* Video Call Button */}
      <button
        onClick={onVideoCall}
        className="bg-yellow-500 p-2 rounded-lg text-black font-bold hover:bg-yellow-400 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-yellow-300"
        aria-label="Start Video Call"
      >
        <Video size={22} />
      </button>
    </div>
  );
};

export default ChatHeader;
