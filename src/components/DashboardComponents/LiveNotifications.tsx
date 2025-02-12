"use client";

import { Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  { 
    type: "loan",
    businessName: "Janna's Gourmet Bistro",
    message: "New loan request",
  },
  {
    type: "loan",
    businessName: "Fajri's Fashion",
    message: "New loan request",
  },
  {
    type: "message",
    businessName: "Fajri's Fashion",
    message: "New Message from",
  },
];

export default function LiveNotifications() {
  return (
    <div className="bg-[#0D2137] rounded-md h-[220px] flex flex-col shadow-sm">
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#FFD700]" />
          <h2 className="text-white text-sm font-semibold">
            Live Notifications
          </h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 hover:bg-[#162B3F] transition-all rounded-md cursor-pointer"
          >
            {notification.type === "loan" ? (
              <Bell className="w-4 h-4 text-[#FFD700]" />
            ) : (
              <MessageSquare className="w-4 h-4 text-[#FFD700]" />
            )}
            <span className="text-white text-xs">
              {notification.message}{" "}
              <span className="text-[#FFD700]">
                {notification.businessName}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-[#19376D]">
        <Button className="w-full bg-[#FFD700] text-[#0D2137] text-xs py-1 hover:bg-[#FFD700]/90">
          View requests
        </Button>
      </div>
    </div>
  );
}
