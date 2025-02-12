"use client";

import LiveNotifications from "@/components/DashboardComponents/LiveNotifications";
import { NewRequests } from "@/components/DashboardComponents/NewRequests";
import { RecentHistory } from "@/components/DashboardComponents/RecentHistory";
import { RecentMessages } from "@/components/DashboardComponents/RecentMessages";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <LiveNotifications />
        <NewRequests />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <RecentMessages />
        <RecentHistory />
      </div>
    </div>
  );
}
