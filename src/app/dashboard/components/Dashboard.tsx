"use client";

import { useEffect, useState } from "react";
import {
  fetchDashboardData,
  type DashboardData,
} from "@/app/api/actions/dashboard";
import PendingReview from "./PendingReview";
import RecentRequests from "./RecentRequests";
import RecentChats from "./RecentChats";
import RecentHistory from "./RecentHistory";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PendingReview data={dashboardData.pendingReview} />
        <RecentRequests
          requests={dashboardData.fiveMostRecentRequests.requests}
        />
        <RecentChats chats={dashboardData.fourMostRecentChats} />
        <RecentHistory history={dashboardData.recentHistory} />
      </div>
    </div>
  );
}
