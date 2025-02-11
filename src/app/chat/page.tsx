import ChatLayout from "@/components/ChatComponents/ChatSidebar/ChatLayout";
import ChatSidebar from "@/components/ChatComponents/ChatSidebar/ChatSidebar";
import React from "react";

const page = () => {
  return (
    <div className="chat-page flex h-[90vh] bg-darkBlue">
      {/* Sidebar */}
      <div className="bg-darkBlueLight h-full w-full">
        <ChatLayout />
      </div>
    </div>
  );
};

export default page;
