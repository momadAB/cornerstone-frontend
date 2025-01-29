"use client";

import { io } from "socket.io-client";
import React, { useEffect, useRef } from "react";

const Dashboard = () => {
  const localVideoRef = useRef(null);
  const pcRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = io("ws://your-backend-url");
    socketRef.current = socket;

    // Create PeerConnection
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pcRef.current = pc;

    // Capture local video and audio
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Display local stream
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Add local tracks to PeerConnection
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    // WebSocket signaling
    socket.on("offer", async (data) => {
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { answer });
    });

    socket.on("ice-candidate", (data) => {
      pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { candidate: event.candidate });
      }
    };

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      pc.close();
    };
  }, []);

  return (
    <div>
      <h1>Video Call Dashboard</h1>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        style={{ width: "100%", maxHeight: "500px" }}
      ></video>
    </div>
  );
};

export default Dashboard;
