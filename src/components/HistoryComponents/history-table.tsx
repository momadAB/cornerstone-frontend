"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { CategoryBadge } from "@/components/HistoryComponents/category-badge";
import { historyData } from "@/lib/historyData";
import { TablePagination } from "@/components/HistoryComponents/TablePagination";

interface HistoryTableProps {
  status: string;
  searchQuery?: string;
}

export function HistoryTable({ status, searchQuery = "" }: HistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [status, searchQuery]);

  const filteredData = useMemo(() => {
    let data = historyData;

    if (status !== "all") {
      data = data.filter((record) => record.status === status);
    }

    return data.filter((record) => {
      const businessName = record.businessName?.toLowerCase() || "";
      const businessOwner = record.businessOwner?.toLowerCase() || "";
      const category = record.category?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();

      return (
        businessName.includes(query) ||
        businessOwner.includes(query) ||
        category.includes(query)
      );
    });
  }, [status, searchQuery]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / recordsPerPage),
    [filteredData.length]
  );

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * recordsPerPage,
      currentPage * recordsPerPage
    );
  }, [filteredData, currentPage]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return (
    <div className="rounded-lg border border-[#2D3A5C] bg-[#0B1638] p-4 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="border-b border-[#2D3A5C] bg-[#142144] text-white/80 text-sm uppercase tracking-wide">
              {[
                { label: "Business Name", width: "11%" },
                { label: "Owner", width: "12%" },
                { label: "Amount", width: "12%" },
                { label: "Period", width: "12%" },
                { label: "Date", width: "12%" },
                { label: "Category", width: "12%" },
                { label: "Status", width: "12%" },
              ].map(({ label, width }) => (
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
            {paginatedData.length > 0 ? (
              paginatedData.map((record, index) => {
                const isEvenRow = index % 2 === 0;
                const rowColor = isEvenRow ? "bg-[#0B1638]" : "bg-[#1A2C50]";

                const statusColors = {
                  pending: "bg-yellow-500 text-black",
                  approved: "bg-green-500 text-white",
                  declined: "bg-red-500 text-white",
                };

                return (
                  <tr
                    key={record.id}
                    className={`border-b border-[#2D3A5C] ${rowColor} hover:bg-[#1C2E55] transition-all`}
                  >
                    <td className="py-3 px-5 text-sm text-white font-semibold text-center">
                      {record.businessName || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.businessOwner || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.amount || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.paymentPeriod || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.date || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-center">
                      <CategoryBadge category={record.category || "Unknown"} />
                    </td>
                    <td className="py-3 px-5 text-sm font-semibold text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          statusColors[record.status] ||
                          "bg-gray-700 text-white"
                        }`}
                      >
                        {record.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-white/60">
                  No records found for {searchQuery}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
