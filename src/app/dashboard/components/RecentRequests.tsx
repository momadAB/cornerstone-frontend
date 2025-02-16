"use client";
import { useState } from "react";

interface Request {
  date: string;
  amount: number;
  businessName: string;
  id: number;
  title: string;
}

interface RecentRequestsProps {
  requests: Request[];
}

export default function RecentRequests({ requests }: RecentRequestsProps) {
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );

  const handleRowClick = (requestId: number) => {
    setSelectedRequestId(requestId);
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

  const columns = [
    { label: "Title", width: "30%" },
    { label: "Business Name", width: "30%" },
    { label: "Amount", width: "20%" },
    { label: "Date", width: "20%" },
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
            {requests.length > 0 ? (
              requests.map((request, index) => {
                const isEvenRow = index % 2 === 0;
                const rowColor = isEvenRow ? "bg-[#0B1638]" : "bg-[#1A2C50]";

                return (
                  <tr
                    key={request.id}
                    className={`border-b border-[#2D3A5C] ${rowColor} hover:bg-[#2f4880] transition-all cursor-pointer`}
                    onClick={() => handleRowClick(request.id)}
                  >
                    <td className="py-3 px-1 text-sm text-white font-semibold text-center">
                      {request.title || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {request.businessName || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {request.amount?.toLocaleString() || "N/A"} KD
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {request.date ? formatDate(request.date) : "N/A"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-white/60">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
