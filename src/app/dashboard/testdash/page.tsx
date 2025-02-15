"use client";

import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { getZegoToken } from "@/app/api/actions/chat";
import { getUser } from "@/lib/token";

const ZegoRoom = () => {
  const roomContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeRoom = async () => {
      try {
        // Get user information
        const user = await getUser();
        const userId = user.sub;
        const userName = user.sub;

        // Generate a random room ID if not provided
        const roomId = "123";

        // Get token from your backend
        const token = await getZegoToken();

        // Generate kit token
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          1621616120, // Your app ID
          token as string,
          roomId,
          userId,
          userName
        );

        // Create ZegoUIKitPrebuilt instance
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Generate shareable link
        const sharedLinks = [
          {
            name: "Personal link",
            url: `${window.location.origin}${window.location.pathname}?roomID=${roomId}`,
          },
        ];

        // Join room
        if (roomContainerRef.current) {
          await zp.joinRoom({
            container: roomContainerRef.current,
            maxUsers: 4,
            scenario: {
              mode: ZegoUIKitPrebuilt.GroupCall,
            },
            showScreenSharingButton: true,
            sharedLinks,
            branding: {
              logoURL: "", // You can add your logo URL here
            },
            onUserLeave: () => {
              console.log("User left the room");
            },
            onUserJoin: () => {
              console.log("New user joined");
            },
          });
        }
      } catch (error) {
        console.error("Failed to initialize video room:", error);
      }
    };

    initializeRoom();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100%-1.25rem)]">
      <div ref={roomContainerRef} className="flex-1 w-full bg-transparent" />
    </div>
  );
};

export default ZegoRoom;
