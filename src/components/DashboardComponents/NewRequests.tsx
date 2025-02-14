import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const requests = [
  {
    businessName: "Janna's Gourmet Bistro",
    businessOwner: "Janna Almuqailib",
    amount: "2,400 KWD",
    paymentPeriod: "3 months",
    date: "Jan 22, 2025",
    category: "Restaurant",
  },
  {
    businessName: "Fajri's Fashion Finds",
    businessOwner: "Fajri Alhusaini",
    amount: "1,500 KWD",
    paymentPeriod: "2 years",
    date: "Jan 21, 2025",
    category: "E-commerce",
  },
  {
    businessName: "Crafts by Mohammad",
    businessOwner: "Mohammad Baqer",
    amount: "3,100 KWD",
    paymentPeriod: "1 year",
    date: "Jan 21, 2025",
    category: "Handmade Crafts",
  },
];

export function NewRequests() {
  return (
    <div className="bg-[#0D2137] rounded-lg flex flex-col mx-4">
      <div className="p-4 border-b border-[#19376D]">
        <h2 className="text-white text-base font-semibold">New Requests</h2>
      </div>
      <div className="flex-1 overflow-x-auto px-4">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#19376D]">
              <TableHead className="text-white">Business Name</TableHead>
              <TableHead className="text-white">Business Owner</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Payment Period</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Business Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.businessName}
                className="border-b border-[#19376D]"
              >
                <TableCell className="text-white">
                  {request.businessName}
                </TableCell>
                <TableCell className="text-white">
                  {request.businessOwner}
                </TableCell>
                <TableCell className="text-white">{request.amount}</TableCell>
                <TableCell className="text-white">
                  {request.paymentPeriod}
                </TableCell>
                <TableCell className="text-white">{request.date}</TableCell>
                <TableCell>
                  <Badge className="bg-[#FFD700]/20 text-[#FFD700]">
                    {request.category}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
