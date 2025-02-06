import React, { useState, useEffect } from "react";
import { BellRing, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const NotificationSystem = ({ messages }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1];
      setLatestMessage(newMessage);
      setUnreadCount((prev) => prev + 1);
      setShowToast(true);

      // Auto-hide toast after 5 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleClear = () => {
    setUnreadCount(0);
    setShowDropdown(false);
    setShowToast(false);
  };

  return (
    <>
      {/* Bell Icon with Dropdown */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <BellRing className="h-6 w-6 text-blue-500" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100">
              <div className="p-3 border-b flex justify-between items-center">
                <h3 className="font-semibold">Notifications</h3>
                <button
                  onClick={handleClear}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {messages.length > 0 ? (
                  messages
                    .slice()
                    .reverse()
                    .map((msg, index) => (
                      <div
                        key={index}
                        className="p-3 border-b hover:bg-gray-50"
                      >
                        <div className="font-medium">
                          New message from {msg.senderName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {msg.message}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && latestMessage && (
        <div className="fixed top-16 right-4 z-50 max-w-sm animate-in slide-in-from-top-2">
          <Alert className="bg-white border-blue-200 shadow-lg">
            <BellRing className="h-4 w-4 text-blue-500" />
            <AlertTitle className="flex items-center gap-2">
              New Message
            </AlertTitle>
            <AlertDescription className="mt-2">
              <strong>{latestMessage.senderName}:</strong>{" "}
              {latestMessage.message}
            </AlertDescription>
            <button
              onClick={() => setShowToast(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        </div>
      )}
    </>
  );
};

export default NotificationSystem;
