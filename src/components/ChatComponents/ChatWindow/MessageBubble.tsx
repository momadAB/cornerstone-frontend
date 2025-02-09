import type React from "react";

interface MessageProps {
  sender: string;
  text: string;
  time: string;
  isSent: boolean;
}

const MessageBubble: React.FC<MessageProps> = ({
  sender,
  text,
  time,
  isSent,
}) => {
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`p-3 max-w-[70%] rounded-xl ${
          isSent ? "bg-yellow-500 text-black" : "bg-white text-black"
        } shadow-md relative group`}
      >
        {!isSent && (
          <p className="text-xs font-semibold text-gray-700 mb-1">{sender}</p>
        )}
        <p className="text-md">{text}</p>
        <span className="text-xs text-gray-500 block text-right mt-1 opacity-80">
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
