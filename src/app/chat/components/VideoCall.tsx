// ZegoRoom.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { getZegoToken } from "@/app/api/actions/chat";
import { getUser } from "@/lib/token";

const ZegoRoom = ({ roomID }: { roomID: string }) => {
  const roomContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeRoom = async () => {
      try {
        const { ZegoUIKitPrebuilt } = await import(
          "@zegocloud/zego-uikit-prebuilt"
        );

        const user = await getUser();
        const userId = user.sub;
        const userName = user.sub;

        const token = await getZegoToken();
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          1621616120,
          token as string,
          roomID,
          userId,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        const sharedLinks = [];

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
              logoURL: "",
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
  }, [roomID]);

  return (
    <div className="w-full h-full">
      <div ref={roomContainerRef} className="w-full h-full overflow-hidden" />
    </div>
  );
};

export default ZegoRoom;
