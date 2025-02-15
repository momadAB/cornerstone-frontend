"use client";

import React, { useEffect, useRef, useState } from "react";
import { getZegoToken } from "@/app/api/actions/chat";
import { getUser } from "@/lib/token";

const ZegoDashboard = () => {
  const appID = 1621616120;
  const server = "wss://webliveroom1621616120-api.coolzcloud.com/ws";

  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [roomID, setRoomID] = useState("");
  const [streamID, setStreamID] = useState("");
  const [isUserInfoReady, setIsUserInfoReady] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const zegoEngineRef = useRef<any>(null);

  // First useEffect to set up user information
  useEffect(() => {
    const setupUserInfo = async () => {
      try {
        const user = await getUser();
        console.log("User info:", user);

        setUserID(user.sub);
        setUserName(user.sub);
        setRoomID("Test");
        setStreamID(`stream_${user.civilId}`);
        setIsUserInfoReady(true);
      } catch (err) {
        console.error("Failed to get user info:", err);
        setError("Failed to get user information");
        setIsLoading(false);
      }
    };

    setupUserInfo();
  }, []);

  // Second useEffect to initialize Zego after user info is ready
  useEffect(() => {
    const initializeZegoWithToken = async () => {
      if (!isUserInfoReady) return;

      try {
        const tokenResponse = await getZegoToken();
        setToken(tokenResponse as string);
        await initializeZego(tokenResponse as string);
      } catch (err) {
        console.error("Failed to initialize:", err);
        setError("Failed to initialize video call. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isUserInfoReady) {
      initializeZegoWithToken();
    }
  }, [isUserInfoReady, userID, userName, roomID, streamID]);

  const initializeZego = async (authToken: string) => {
    if (!userID || !userName || !roomID || !streamID) {
      throw new Error("Required user information is missing");
    }

    const { ZegoExpressEngine } = await import("zego-express-engine-webrtc");
    const zegoEngine = new ZegoExpressEngine(appID, server);
    zegoEngineRef.current = zegoEngine;

    try {
      console.log("Logging into room with:", {
        roomID,
        userID,
        userName,
        streamID,
      });

      await zegoEngine.loginRoom(
        roomID,
        authToken,
        { userID, userName },
        { userUpdate: true }
      );
      console.log("✅ Logged into room successfully.");

      const localStream = await zegoEngine.createStream({
        camera: {
          video: true,
          audio: true,
        },
        // Ensure we're explicitly requesting video
        video: true,
        audio: true,
      });

      // Add a check to ensure the stream has video tracks
      if (localStream.getVideoTracks().length === 0) {
        console.error("No video tracks found in local stream");
        throw new Error("Failed to get video track");
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
        // Add playsInline attribute to video element
        localVideoRef.current.playsInline = true;
        try {
          await localVideoRef.current.play();
          console.log("Local video playback started successfully");
        } catch (err) {
          console.error("Local video play error:", err);
          // Attempt auto-play with user interaction
          const playPromise = localVideoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.warn("Playback required user interaction:", error);
            });
          }
        }
      }

      await zegoEngine.startPublishingStream(streamID, localStream);
      console.log("✅ Started publishing local stream.");

      zegoEngine.on(
        "roomStreamUpdate",
        async (roomID: string, updateType: string, streamList: any[]) => {
          if (updateType === "ADD") {
            console.log("🔔 New stream(s) added:", streamList);
            for (const streamInfo of streamList) {
              const remoteStream = await zegoEngine.startPlayingStream(
                streamInfo.streamID
              );
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
                await remoteVideoRef.current
                  .play()
                  .catch((err) =>
                    console.warn("Remote video play error:", err)
                  );
              }
            }
          } else if (updateType === "DELETE") {
            console.log("🔔 Stream(s) removed:", streamList);
          }
        }
      );
    } catch (error) {
      console.error("❌ Failed to initialize Zego:", error);
      throw error;
    }
  };

  // Cleanup useEffect
  useEffect(() => {
    return () => {
      if (zegoEngineRef.current) {
        console.log("Cleaning up ZEGOCLOUD...");

        zegoEngineRef.current.stopPublishingStream(streamID).catch(() => {});
        zegoEngineRef.current.logoutRoom(roomID).catch(() => {});

        if (localVideoRef.current?.srcObject) {
          zegoEngineRef.current.destroyStream(localVideoRef.current.srcObject);
        }

        zegoEngineRef.current.off("roomStreamUpdate");
        zegoEngineRef.current.destroyEngine();
        zegoEngineRef.current = null;
      }
    };
  }, [roomID, streamID]);

  if (isLoading) {
    return <div>Loading video call...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1>Video Call Dashboard (ZEGOCLOUD)</h1>
      <div className="flex gap-5">
        <div>
          <h2>Local Video</h2>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full max-h-[500px] bg-black"
          ></video>
        </div>
        <div>
          <h2>Remote Video</h2>
          <video
            ref={remoteVideoRef}
            autoPlay
            className="w-full max-h-[500px] bg-black"
          ></video>
        </div>
      </div>
    </div>
  );
};

export default ZegoDashboard;
