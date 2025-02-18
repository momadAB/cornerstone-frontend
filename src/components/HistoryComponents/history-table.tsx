"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { TablePagination } from "@/components/HistoryComponents/TablePagination";
import {
  fetchLoanHistory,
  LoanHistoryResponse,
} from "@/app/api/actions/history";
import { LoanDetailsModal } from "../LoanRequestDetails/LoanDetailsModalProps";

interface HistoryTableProps {
  status: string;
  searchQuery?: string;
  recordsPerPage?: number;
  showPagination?: boolean;
}

export interface HistoryRecord {
  id: number;
  businessName: string;
  businessOwner: string;
  amount: number;
  paymentPeriod: string;
  date: string;
  status: string;
  otherBanksHaveMadeCounterResponse: boolean;
  loanRequestStatus: string;
  loanResponseStatus: string;
}

function capitalizeWords(fullName) {
  return fullName
    .split(" ") // Split by space
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
    .join(" "); // Join them back into a single string
}

const formatBackendStrings = (input) => {
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

export function HistoryTable({
  status,
  searchQuery = "",
  recordsPerPage = 8,
  showPagination = true,
}: HistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState<HistoryRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const recordsPerPage = 8;

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isModalOpenRef = useRef(false);
  const previousDataRef = useRef<HistoryRecord[]>([]);

  const handleRowClick = (loanId: number) => {
    setSelectedLoanId(loanId);
    setIsModalOpen(true);
  };

  const hasDataChanged = (
    newData: HistoryRecord[],
    oldData: HistoryRecord[]
  ): boolean => {
    const newIds = new Set(newData.map((record) => record.id));
    const oldIds = new Set(oldData.map((record) => record.id));

    if (newIds.size !== oldIds.size) {
      console.log(
        `Different number of records detected: Old=${oldIds.size}, New=${newIds.size}`
      );
      return true;
    }

    for (const id of newIds) {
      if (!oldIds.has(id)) {
        console.log(`New record detected with ID: ${id}`);
        return true;
      }
    }

    const statusChange = newData.some((newRecord) => {
      const oldRecord = oldData.find((old) => old.id === newRecord.id);
      if (oldRecord && oldRecord.status !== newRecord.status) {
        console.log(`Status change detected for ID ${newRecord.id}:`, {
          oldStatus: oldRecord.status,
          newStatus: newRecord.status,
        });
        return true;
      }
      return false;
    });

    return statusChange;
  };

  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  useEffect(() => {
    const loadHistoryData = async () => {
      if (isModalOpenRef.current) return;

      try {
        const response: LoanHistoryResponse = await fetchLoanHistory(
          currentPage - 1,
          status === "null" ? "PENDING" : status,
          searchQuery,
          recordsPerPage
        );

        console.log("response: ", response);

        if (response.status === "SUCCESS") {
          const transformedData = response.requests.map((item: any) => {
            // Determine the status based on loanRequestStatus and loanResponseStatus
            let displayStatus = "PENDING";

            if (
              item.loanRequestStatus === "APPROVED" &&
              item.loanResponseStatus !== "APPROVED"
            ) {
              displayStatus = "RESCINDED";
            } else if (item.loanResponseStatus !== null) {
              displayStatus = item.loanResponseStatus;
            }

            return {
              id: item.id,
              businessName: item.businessName,
              businessOwner: item.businessOwner,
              amount: item.amount,
              paymentPeriod: item.paymentPeriod,
              date: item.date,
              status: displayStatus,
              otherBanksHaveMadeCounterResponse:
                item.otherBanksHaveMadeCounterResponse,
              loanRequestStatus: item.loanRequestStatus,
              loanResponseStatus: item.loanResponseStatus,
            };
          });

          if (
            !isModalOpenRef.current &&
            hasDataChanged(transformedData, previousDataRef.current)
          ) {
            console.log("Updating data");
            if (!isModalOpenRef.current) setIsLoading(true);
            setHistoryData(transformedData);
            setTotalRecords(response.totalRecords);
            previousDataRef.current = transformedData;
          }
        }
      } catch (err) {
        if (!isModalOpenRef.current) {
          setError("Failed to fetch history data");
          console.error(err);
        }
      } finally {
        if (!isModalOpenRef.current) setIsLoading(false);
      }
    };

    loadHistoryData();
    pollingIntervalRef.current = setInterval(loadHistoryData, 4000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [currentPage, status, searchQuery, recordsPerPage]);

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

  if (isLoading && !isModalOpen) {
    console.log("Is loading and not modal open");
    return (
      <div className="rounded-lg border border-[#2D3A5C] bg-[#0B1638] p-4 shadow-lg">
        <div className="text-center py-6 text-white/60">Loading...</div>
      </div>
    );
  }

  if (error && !isModalOpen) {
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

  return (
    <div className="">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="border-b border-[#2D3A5C] bg-[#0F293E] text-white/80 text-sm uppercase tracking-wide">
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
                const rowColor = isEvenRow ? "bg-[#184466]" : "bg-[#133652]";
                return (
                  <tr
                    key={record.id}
                    className={`border-b border-[#2D3A5C] ${rowColor} hover:bg-[#1D5580] transition-all cursor-pointer`}
                    onClick={() => handleRowClick(record.id)}
                  >
                    <td className="py-3 px-1 text-sm text-white font-semibold text-center">
                      {record.businessName || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {capitalizeWords(record.businessOwner) || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {record.amount?.toLocaleString() || "N/A"} KD
                    </td>
                    <td className="py-3 px-5 text-sm text-white/80 text-center">
                      {formatBackendStrings(record.paymentPeriod) || "N/A"}
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
                        {record.otherBanksHaveMadeCounterResponse &&
                          record.status !== "RESCINDED" && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-400 text-black">
                              COMPETING OFFERS MADE
                            </span>
                          )}
                      </div>
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
      {totalPages > 1 && showPagination && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
