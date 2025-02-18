"use client";
import { useEffect, useState, useCallback } from "react";
import {
  fetchDashboardData,
  type DashboardData,
} from "@/app/api/actions/dashboard";
import PendingReview from "./PendingReview";
import RecentRequests from "./RecentRequests";
import RecentChats from "./RecentChats";
import RecentHistory from "./RecentHistory";
import RecentNotifications from "./RecentNotifications";
import { HistoryTable } from "@/components/HistoryComponents/history-table";
import { Banknote } from "lucide-react";

const POLLING_INTERVAL = 4000; // 4 seconds in milliseconds

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    try {
      const data = await fetchDashboardData();
      setDashboardData(data);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again later.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load
    loadDashboardData();

    // Set up polling interval
    const intervalId = setInterval(loadDashboardData, POLLING_INTERVAL);

    // Cleanup function to clear interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [loadDashboardData]);

  if (isLoading && !dashboardData) {
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
    <div className="container mx-auto px-4 text-black">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <RecentNotifications notifications={dashboardData.notifications} />
        <PendingReview data={dashboardData.pendingReview} />
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2 ml-5">
            <Banknote className="text-[#FFD700]" size={20} />
            <p className="text-white font-extrabold text-lg">New Requests</p>
          </div>
          <HistoryTable
            status="null"
            recordsPerPage={5}
            showPagination={false}
          />
        </div>
      </div>
    </div>
  );
}
