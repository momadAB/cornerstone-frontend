"use client";
import { useState, useEffect, useCallback } from "react";
import { TablePagination } from "@/components/HistoryComponents/TablePagination";
import {
  fetchLoanHistory,
  LoanHistoryResponse,
} from "@/app/api/actions/history";
import { LoanDetailsModal } from "../LoanRequestDetails/LoanDetailsModalProps";

interface HistoryTableProps {
  status: string;
  searchQuery?: string;
}

export interface HistoryRecord {
  id: number;
  businessName: string;
  businessOwner: string;
  amount: number;
  paymentPeriod: string;
  date: string;
  status: string;
}

export function HistoryTable({ status, searchQuery = "" }: HistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState<HistoryRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recordsPerPage = 8;

  const handleRowClick = (loanId: number) => {
    setSelectedLoanId(loanId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const loadHistoryData = async () => {
      try {
        setIsLoading(true);
        const response: LoanHistoryResponse = await fetchLoanHistory(
          currentPage - 1,
          status === "null" ? "PENDING" : status, // Convert "null" string to actual null
          searchQuery,
          recordsPerPage
        );
        console.log(response);

        if (response.status === "SUCCESS") {
          const transformedData = response.requests.map((item: any) => ({
            id: item.id,
            businessName: item.businessName,
            businessOwner: item.businessOwner,
            amount: item.amount,
            paymentPeriod: item.paymentPeriod,
            date: item.date,
            status:
              item.loanResponseStatus === null
                ? "PENDING"
                : item.loanResponseStatus,
          }));
          console.log("transofmred:", transformedData);
          setHistoryData(transformedData);
          setTotalRecords(response.totalRecords);
        }
      } catch (err) {
        setError("Failed to fetch history data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadHistoryData();
  }, [currentPage, status, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [status, searchQuery]);

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

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

  if (isLoading) {
    return (
      <div className="rounded-lg border border-[#2D3A5C] bg-[#0B1638] p-4 shadow-lg">
        <div className="text-center py-6 text-white/60">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-[#2D3A5C] bg-[#0B1638] p-4 shadow-lg">
        <div className="text-center py-6 text-red-500">{error}</div>
      </div>
    );
  }

  const columns = [
    { label: "Business Name", width: "20%" },
    { label: "Owner", width: "15%" },
    { label: "Amount", width: "15%" },
    { label: "Period", width: "15%" },
    { label: "Date", width: "20%" },
    { label: "Status", width: "15%" },
  ];

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-300 text-black",
    APPROVED: "bg-green-400 text-black",
    REJECTED: "bg-red-300 text-black",
    NEW_RESPONSE: "bg-yellow-300 text-black",
    RESCINDED: "bg-yellow-300 text-black",
  };

  return (
    <div className="rounded-lg border border-[#2D3A5C] bg-[#0B1638] p-4 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
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
            {historyData.length > 0 ? (
              historyData.map((record, index) => {
                const isEvenRow = index % 2 === 0;
                const rowColor = isEvenRow ? "bg-[#0B1638]" : "bg-[#1A2C50]";

                return (
                  <tr
                    key={record.id}
                    className={`border-b border-[#2D3A5C] ${rowColor} hover:bg-[#2f4880] transition-all cursor-pointer`}
                    onClick={() => handleRowClick(record.id)}
                  >
                    <td className="py-3 px-1 text-sm text-white font-semibold text-center">
                      {record.businessName || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.businessOwner || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.amount?.toLocaleString() || "N/A"} KD
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.paymentPeriod || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.date ? formatDate(record.date) : "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm font-semibold text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          statusColors[record.status] ||
                          "bg-gray-700 text-white"
                        }`}
                      >
                        {console.log(record)}
                        {record.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-white/60">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <LoanDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        loanId={selectedLoanId}
      />
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
