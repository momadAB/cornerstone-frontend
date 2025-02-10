interface Chat {
  id: number;
  otherUser: {
    id: number;
    firstName: string;
    bank: string;
    isYou: boolean;
  };
  latestMessage: string | null;
  latestMessageSenderIsYou: boolean;
}

interface RecentChatsProps {
  chats: Chat[];
}

export default function RecentChats({ chats }: RecentChatsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
      <ul className="space-y-4">
        {chats.map((chat) => (
          <li key={chat.id} className="border-b pb-2">
            <p className="font-medium">{chat.otherUser.firstName}</p>
            <p className="text-sm text-gray-600">{chat.otherUser.bank}</p>
            {chat.latestMessage && (
              <p className="text-sm italic">
                {chat.latestMessageSenderIsYou ? "You: " : ""}
                {chat.latestMessage}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
