import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoanDetailsModal } from "@/components/LoanRequestDetails/LoanDetailsModalProps";

interface LoanRequest {
  id: number;
  loanResponseStatus: string | null;
  businessName: string;
  businessOwner: string;
  amount: number;
  paymentPeriod: string;
  date: string;
}

interface LoanRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: LoanRequest[];
}

export function LoanRequestsModal({
  isOpen,
  onClose,
  requests,
}: LoanRequestsModalProps) {
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleRowClick = (loanId: number) => {
    setSelectedLoanId(loanId);
    setIsDetailsModalOpen(true);
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-[#0B1638] text-white max-w-4xl max-h-[80vh] overflow-scroll">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              Loan Requests
            </DialogTitle>
          </DialogHeader>
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
                {requests.length > 0 ? (
                  requests.map((record, index) => {
                    const isEvenRow = index % 2 === 0;
                    const rowColor = isEvenRow
                      ? "bg-[#0B1638]"
                      : "bg-[#1A2C50]";

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
                              statusColors[
                                record.loanResponseStatus || "PENDING"
                              ] || "bg-gray-700 text-white"
                            }`}
                          >
                            {record.loanResponseStatus || "PENDING"}
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
        </DialogContent>
      </Dialog>

      <LoanDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        loanId={selectedLoanId}
      />
    </>
  );
}
