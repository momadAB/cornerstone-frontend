// VideoCallModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoCall from "@/app/chat/components/VideoCall";

const VideoCallModal = ({ isOpen, onClose, roomId }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  roomId = `room_${roomId}`;

  return (
    <div
      className="fixed z-50 bg-gray-900 rounded-lg shadow-xl border border-yellow-400/50 overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "1000px",
        height: "700px",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="p-4 bg-[#0F1624] rounded-t-lg flex justify-between items-center cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <h3 className="text-white font-semibold">Video Call</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 h-[calc(100%-4rem)] overflow-hidden">
        <VideoCall roomID={roomId} />
      </div>
    </div>
  );
};

export default VideoCallModal;
