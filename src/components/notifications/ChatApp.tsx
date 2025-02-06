"use client";
import { NotificationType } from "@/lib/types/NotificationTypes";

import { loadContext } from "@/app/api/actions/auth";
import { getToken, getUser } from "@/lib/token";
import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

import NotificationToast from "./NotificationSystem";
import NotificationBell from "./NotificationSystem";
import NotificationSystem from "./NotificationSystem";

let stompClient = null;

export default function ChatApp() {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await getToken();
        const user = await getUser();

        // After context is loaded, initialize WebSocket
        const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
        stompClient = over(socket);

        console.log(token);
        console.log(user);
        setUsername(user.sub);
        setUserRole(user.roles);

        // Convert WebSocket connection to Promise
        await new Promise((resolve, reject) => {
          stompClient.connect(
            {},
            () => {
              // Subscribe to channels after successful connection
              stompClient.subscribe("/user/topic/queue", onMessageReceived);
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        });

        setIsInitialized(true);
      } catch (err) {
        console.error("Initialization error:", err);
        setError(err.message);
      }
    };

    initialize();

    // Cleanup function
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  const onMessageReceived = (payload) => {
    try {
      const data = JSON.parse(payload.body);

      // Update state with the extracted message
      setMessages((prevMessages) => [...prevMessages, data]);

      console.log("Received Message:", data);
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  const sendMessage = () => {
    if (stompClient && messageInput.trim() && isInitialized) {
      const chatMessage = {
        senderName: username,
        recipientName: username,
        message: messageInput,
        senderRole: userRole,
        type: NotificationType.NEW_MESSAGE,
      };
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setMessageInput("");
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="container mx-auto p-4">
        <div>Connecting...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <NotificationSystem
        messages={messages}
        onDismiss={() => {
          // Optional: Handle dismissal, e.g., mark messages as read
        }}
      />
      <h1 className="text-2xl font-bold">WebSocket Chat</h1>
      <div className="border p-4 mt-4 h-64 overflow-auto bg-gray-100">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderName}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        className="border p-2 mt-2 w-full"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
