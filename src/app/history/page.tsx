"use client";

import { useState } from "react";

import { useSearch } from "@/components/SearchBar/SearchContext"; // ✅ Use SearchContext
import { StatusTabs } from "@/components/HistoryComponents/status-tabs";
import { HistoryTable } from "@/components/HistoryComponents/history-table";

export default function HistoryPage() {
  const [status, setStatus] = useState("null");
  const { searchQuery } = useSearch(); // ✅ Get searchQuery from context

  return (
    <div className="h-[calc(100%-1.25rem)] p-5 px-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Status Tabs */}
        <StatusTabs value={status} onValueChange={setStatus} />

        {/* ✅ Pass `searchQuery` from SearchContext to HistoryTable */}
        <HistoryTable status={status} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
