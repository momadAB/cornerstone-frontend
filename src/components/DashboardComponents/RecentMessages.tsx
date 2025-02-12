const messages = [
  {
    name: "Fajri Alhusaini",
    message: "How are you today?",
    time: "2 min ago",
    unread: true,
    avatar: "/placeholder.svg",
  },
  {
    name: "Abdulrahman Alfahad",
    message: "How are you today?",
    time: "2 min ago",
    unread: true,
    avatar: "/placeholder.svg",
  },
  {
    name: "Mohammad Baqer",
    message: "How are you today?",
    time: "2 min ago",
    unread: true,
    avatar: "/placeholder.svg",
  },
  {
    name: "Salem AL-Mutairi",
    message: "How are you today?",
    time: "2 min ago",
    unread: true,
    avatar: "/placeholder.svg",
  },
];

export function RecentMessages() {
  return (
    <div className="bg-[#0D2137] rounded-lg p-4">
      <h2 className="text-white font-semibold mb-4">Recent Messages</h2>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.name}
            className="flex items-center gap-3 cursor-pointer hover:bg-[#162B3F] p-2 rounded-lg"
          >
            <img
              src={message.avatar}
              alt={message.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium truncate">
                  {message.name}
                </h3>
                <span className="text-gray-400 text-xs">{message.time}</span>
              </div>
              <p className="text-gray-400 text-sm truncate">
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
