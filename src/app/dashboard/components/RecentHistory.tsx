"use client";
import { useState } from "react";

interface HistoryItem {
  date: string;
  amount: number;
  businessName: string;
  id: number;
  title: string;
  status: string;
}

interface RecentHistoryProps {
  history: HistoryItem[];
}

export default function RecentHistory({ history }: RecentHistoryProps) {
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);

  const handleRowClick = (loanId: number) => {
    setSelectedLoanId(loanId);
    // Add modal functionality here if needed
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-300 text-black",
    COUNTER_OFFER: "bg-blue-300 text-black",
    APPROVED: "bg-green-400 text-black",
    REJECTED: "bg-red-300 text-black",
    NEW_RESPONSE: "bg-yellow-300 text-black",
    RESCINDED: "bg-gray-300 text-black",
  };

  const formatStatusText = (status: string) => {
    switch (status) {
      case "COUNTER_OFFER":
        return "COUNTER OFFER MADE";
      case "NEW_RESPONSE":
        return "NEW RESPONSE";
      default:
        return status;
    }
  };

  const columns = [
    { label: "Title", width: "25%" },
    { label: "Business Name", width: "20%" },
    { label: "Amount", width: "20%" },
    { label: "Date", width: "20%" },
    { label: "Status", width: "15%" },
  ];

  return (
    <div className="rounded-lg border border-[#2D3A5C] bg-[#0B1638] p-4 shadow-lg">
      <div className="overflow-x-auto">
        <table className="table-fixed border-collapse">
          <thead>
            <tr className="border-b border-[#2D3A5C] bg-[#142144] text-white/80 text-sm uppercase tracking-wide">
              {columns.map(({ label, width }) => (
                <th
                  key={label}
                  style={{ width }}
                  className="py-3 px-4 text-center"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((record, index) => {
                const isEvenRow = index % 2 === 0;
                const rowColor = isEvenRow ? "bg-[#0B1638]" : "bg-[#1A2C50]";

                return (
                  <tr
                    key={record.id}
                    className={`border-b border-[#2D3A5C] ${rowColor} hover:bg-[#2f4880] transition-all cursor-pointer`}
                    onClick={() => handleRowClick(record.id)}
                  >
                    <td className="py-3 px-1 text-sm text-white font-semibold text-center">
                      {record.title || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.businessName || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.amount?.toLocaleString() || "N/A"} KD
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.date ? formatDate(record.date) : "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm font-semibold text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            statusColors[record.status] ||
                            "bg-gray-700 text-white"
                          }`}
                        >
                          {formatStatusText(record.status) || "Unknown"}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-white/60">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
