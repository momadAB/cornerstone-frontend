"use client";
import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { getZegoToken } from "@/app/api/actions/chat";
import { getUser } from "@/lib/token";
import { useParams, useSearchParams } from "next/navigation";

type JoinRoomConfig = {
  container: HTMLDivElement;
  maxUsers: number;
  scenario: {
    mode: number;
  };
  showScreenSharingButton: boolean;
  sharedLinks: Array<{
    name: string;
    url: string;
  }>;
  branding: {
    logoURL: string;
  };
  onUserLeave: () => void;
  onUserJoin: () => void;
};

const ZegoRoom = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  let roomId = params.roomId as string;
  const token = searchParams.get("token"); // Get token from URL
  const urlUsername = searchParams.get("username"); // Get username from URL
  const roomContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  roomId = `room_${roomId}`;

  useEffect(() => {
    if (!roomId) return;

    const initializeRoom = async () => {
      try {
        // Debug logging
        console.log("Room ID:", roomId);
        console.log("URL Token:", token);
        console.log("Username:", urlUsername);

        const userId = urlUsername;
        const userName = urlUsername;

        // Try to get token from URL first, then fallback to backend
        let zegoToken = token;
        if (!zegoToken) {
          try {
            // Assuming getZegoToken is your backend token generation function
            zegoToken = await getZegoToken(roomId, userId);
            console.log("Backend Token:", zegoToken);
          } catch (tokenError) {
            console.error("Failed to get token from backend:", tokenError);
          }
        }

        if (!zegoToken) {
          throw new Error(
            "Failed to obtain Zego token from both URL and backend"
          );
        }

        console.log(userId, userName, zegoToken, roomId);

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          1621616120,
          zegoToken,
          roomId,
          userId,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        const joinRoomConfig = {
          container: roomContainerRef.current!,
          maxUsers: 4,
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
          },
          showScreenSharingButton: true,
          sharedLinks: [],
          branding: {
            logoURL: "",
          },
          onUserLeave: () => {
            console.log("User left the room");
          },
          onUserJoin: () => {
            console.log("New user joined");
          },
        };

        if (roomContainerRef.current) {
          await zp.joinRoom(joinRoomConfig);
        } else {
          throw new Error("Room container not found");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to initialize video room";
        console.error("Room initialization error:", error);
        setError(errorMessage);
      }
    };

    initializeRoom();

    // Cleanup function
    return () => {
      // Add any cleanup logic here if needed
      // For example, leaving the room when component unmounts
    };
  }, [roomId, token, urlUsername]); // Added urlUsername to dependency array

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <div className="p-4 bg-red-600 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div ref={roomContainerRef} className="flex-1 w-full bg-gray-900" />
    </div>
  );
};

export default ZegoRoom;
