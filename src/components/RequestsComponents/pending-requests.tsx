import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TablePagination } from "./table-pagination";

interface PendingRequest {
  id: string;
  businessOwner: string;
  businessName: string;
  amount: string;
  paymentPeriod: string;
  date: string;
  category: string;
}

interface PendingRequestsProps {
  requests: PendingRequest[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onRequestClick: (id: string) => void;
}

export function PendingRequests({
  requests,
  currentPage,
  onPageChange,
  onRequestClick,
}: PendingRequestsProps) {
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedRequests = requests.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-M font-semibold text-white">
          📋 Pending Requests
        </span>

        <span className="text-xs text-gray-400">
          Showing {displayedRequests.length} of {requests.length} requests
        </span>
      </div>

      <div className="rounded-md overflow-hidden border border-[#144272]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#0A2647] border-b border-[#144272]">
              <TableHead className="text-white text-xs py-2">
                Business Owner
              </TableHead>
              <TableHead className="text-white text-xs py-2">
                Business Name
              </TableHead>
              <TableHead className="text-white text-xs py-2">Amount</TableHead>
              <TableHead className="text-white text-xs py-2">
                Payment Period
              </TableHead>
              <TableHead className="text-white text-xs py-2">Date</TableHead>
              <TableHead className="text-white text-xs py-2">
                Business Category
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedRequests.map((request) => (
              <TableRow
                key={request.id}
                className="bg-[#0A2647] border-b border-[#144272] cursor-pointer hover:bg-[#144272] transition-colors duration-200"
                onClick={() => onRequestClick(request.id)}
              >
                <TableCell className="text-white text-xs py-2">
                  {request.businessOwner}
                </TableCell>
                <TableCell className="text-white text-xs py-2">
                  {request.businessName}
                </TableCell>
                <TableCell className="text-white text-xs py-2">
                  {request.amount}
                </TableCell>
                <TableCell className="text-white text-xs py-2">
                  {request.paymentPeriod}
                </TableCell>
                <TableCell className="text-white text-xs py-2">
                  {request.date}
                </TableCell>
                <TableCell className="py-2">
                  <Badge
                    variant="secondary"
                    className="bg-[#FFD700]/20 text-[#FFD700] text-xs px-2 py-0.5"
                  >
                    {request.category}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
