import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import DateSeparator from "./DateSeparator";

interface Message {
  sender: string;
  text: string;
  time: string;
  isSent: boolean;
  date: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Loading messages...</p>;
  }

  return (
    <div className="message-list flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, index) => (
        <React.Fragment key={index}>
          {index === 0 || messages[index - 1].date !== msg.date ? (
            <DateSeparator date={msg.date} />
          ) : null}
          <MessageBubble {...msg} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MessageList;
