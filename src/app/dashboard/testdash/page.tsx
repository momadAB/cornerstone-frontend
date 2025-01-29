"use client";

import React, { useEffect, useRef } from "react";

const ZegoDashboard = () => {
  // All from Zego console
  const appID = 1435178495;
  const server = "wss://webliveroom1435178495-api.coolzcloud.com/ws";
  const token =
    "04AAAAAGeSGBoADBvv2n4fbIR+IJ6ETgCsEjhZsuDfE1+orFocHbGjODvw8vjozzTZZDUk99wg1fGs2vxAMDX0k8hIggC1X2UcCzkPCDO+DYZ/JIrWATO/uw3zsemi9TTNal/AxfmpLYybkVk1PDfCwfbUc+lxYBfqrhy5VX9ABAEmDqMAYlOpppiZUjb6Q306xG/1WzE9CiZ8fsS6ghkUkCYweFZEpQZ1Y4AdGwqE6n3/EgHRLq6SsrW6WaWzp3xEG9XJmgE=";
  const userID = "2";
  const userName = "TestUser3";
  const roomID = "test-room";
  const streamID = `stream_${userID}`;

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const zegoEngineRef = useRef<any>(null);

  useEffect(() => {
    const initializeZego = async () => {
      const { ZegoExpressEngine } = await import("zego-express-engine-webrtc");
      // 1. Create ZEGOCLOUD engine instance
      const zegoEngine = new ZegoExpressEngine(appID, server);
      zegoEngineRef.current = zegoEngine;

      // 2. Login to room
      zegoEngine
        .loginRoom(
          roomID,
          token,
          { userID, userName }, // Local user info
          { userUpdate: true } // Options (e.g., to track user updates)
        )
        .then(async () => {
          console.log("✅ Logged into room successfully.");

          // 3. Create local stream (audio + video)
          const localStream = await zegoEngine.createStream({
            camera: {
              video: true,
              audio: true,
            },
          });

          // 4. Play local video
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
            localVideoRef.current.play().catch((err) => {
              console.warn("Local video play error:", err);
            });
          }

          // 5. Publish local stream
          //    Provide an identifiable streamID. Usually you'd generate a unique one.
          await zegoEngine.startPublishingStream(streamID, localStream);
          console.log("✅ Started publishing local stream.");
        })
        .catch((error) => {
          console.error("❌ Failed to login to room:", error);
        });

      // 6. Listen for remote streams
      //    This callback notifies you when there are new streams in the room or when existing streams are removed.
      zegoEngine.on(
        "roomStreamUpdate",
        async (roomID, updateType, streamList) => {
          if (updateType === "ADD") {
            console.log("🔔 New stream(s) added:", streamList);
            for (const streamInfo of streamList) {
              // Start playing each new stream
              const remoteStream = await zegoEngine.startPlayingStream(
                streamInfo.streamID
              );
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current
                  .play()
                  .catch((err) =>
                    console.warn("Remote video play error:", err)
                  );
              }
            }
          } else if (updateType === "DELETE") {
            console.log("🔔 Stream(s) removed:", streamList);
            // If needed, handle the stream removal (stop playing, etc.)
          }
        }
      );
    };

    initializeZego();

    // Cleanup on unmount
    return () => {
      console.log("Cleaning up ZEGOCLOUD...");

      // Stop publishing and logout from the room
      zegoEngineRef.current.stopPublishingStream(streamID).catch(() => {});
      zegoEngineRef.current.logoutRoom(roomID).catch(() => {});

      // Destroy local stream if any
      if (localVideoRef.current?.srcObject) {
        zegoEngineRef.current.destroyStream(localVideoRef.current.srcObject);
      }

      // Remove event listeners
      zegoEngineRef.current.off("roomStreamUpdate");

      // Destroy the engine instance
      zegoEngineRef.current.destroyEngine();

      zegoEngineRef.current = null;
    };
  }, []);

  return (
    <div>
      <h1>Video Call Dashboard (ZEGOCLOUD)</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <h2>Local Video</h2>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            style={{ width: "100%", maxHeight: "500px", background: "#000" }}
          ></video>
        </div>
        <div>
          <h2>Remote Video</h2>
          <video
            ref={remoteVideoRef}
            autoPlay
            style={{ width: "100%", maxHeight: "500px", background: "#000" }}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default ZegoDashboard;
