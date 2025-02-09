// "use client";

// import { useState, useCallback, useMemo } from "react";
// import {
//   Search,
//   Bell,
//   Clock,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   ArrowUpDown,
// } from "lucide-react";

// type Record = {
//   businessName: string;
//   businessOwner: string;
//   amount: string;
//   paymentPeriod: string;
//   date: string;
//   category: string;
//   status: string;
//   [key: string]: string;
// };

// const historyData: Record[] = [
//   {
//     businessName: "Janna's Gourmet Bistro",
//     businessOwner: "Janna Almuqaisib",
//     amount: "2,400 KWD",
//     paymentPeriod: "3 months",
//     date: "Jan 22, 2025",
//     category: "Restaurant",
//     status: "approved",
//   },
//   {
//     businessName: "Fajr's Fashion Finds",
//     businessOwner: "Fajr Alhusaini",
//     amount: "1,500 KWD",
//     paymentPeriod: "2 years",
//     date: "Jan 21, 2025",
//     category: "E-commerce",
//     status: "pending",
//   },
//   {
//     businessName: "Crafts by Mohammad",
//     businessOwner: "Mohammad Baqer",
//     amount: "3,100 KWD",
//     paymentPeriod: "1 year",
//     date: "Jan 21, 2025",
//     category: "Handmade Crafts",
//     status: "declined",
//   },
//   {
//     businessName: "Yousef's Tech",
//     businessOwner: "Yousef Almasaeed",
//     amount: "4,500 KWD",
//     paymentPeriod: "18 months",
//     date: "Jan 21, 2025",
//     category: "E-commerce",
//     status: "approved",
//   },
// ];

// // Duplicate data to match the image
// const extendedData: Record[] = [
//   ...historyData,
//   ...historyData.slice(0, 1),
//   ...historyData.slice(3),
//   ...historyData.slice(0, 1),
//   ...historyData.slice(3),
//   ...historyData.slice(0, 1),
//   ...historyData.slice(3),
//   ...historyData.slice(0, 1),
//   ...historyData.slice(3),
//   ...historyData.slice(0, 1),
// ];

// const statusTabs = [
//   {
//     id: "pending",
//     label: "Pending",
//     icon: AlertCircle,
//     color: "text-yellow-400",
//   },
//   {
//     id: "approved",
//     label: "Approved",
//     icon: CheckCircle2,
//     color: "text-[#FFD700]",
//   },
//   { id: "declined", label: "Declined", icon: XCircle, color: "text-red-400" },
// ];

// export default function HistoryPage() {
//   const [status, setStatus] = useState("pending");
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
//   const [page, setPage] = useState(1);

//   const filteredAndSortedData = useMemo(() => {
//     const filteredItems = extendedData.filter((item) => item.status === status);
//     if (sortConfig.key !== "") {
//       filteredItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return filteredItems;
//   }, [status, sortConfig]);

//   const handleSort = useCallback((key: string) => {
//     setSortConfig((current) => ({
//       key,
//       direction:
//         current.key === key && current.direction === "asc" ? "desc" : "asc",
//     }));
//   }, []);

//   return (
//     <div className="min-h-screen p-8">
//       <div className="max-w-[1400px] mx-auto space-y-6">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <Clock className="w-5 h-5 text-white/70" />
//             <h1 className="text-xl font-medium text-white">Recent History</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="relative group">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 group-focus-within:text-[#FFD700]" />
//               <input
//                 placeholder="Search records..."
//                 className="w-[280px] h-9 bg-transparent border border-[#2D3A5C] rounded-md pl-9 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700] transition-colors"
//               />
//             </div>
//             <button className="relative p-2 hover:bg-white/5 rounded-full transition-all hover:scale-105 active:scale-95">
//               <Bell className="w-5 h-5 text-white/70" />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFD700] rounded-full shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
//             </button>
//           </div>
//         </div>

//         <div className="flex">
//           {statusTabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setStatus(tab.id)}
//               className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition-colors ${
//                 status === tab.id
//                   ? tab.id === "approved"
//                     ? "bg-[#FFD700] text-[#0B1638]"
//                     : tab.id === "pending"
//                     ? "bg-yellow-400 text-[#0B1638]"
//                     : "bg-red-400 text-[#0B1638]"
//                   : "text-white/60 hover:text-white hover:bg-white/5"
//               } ${tab.id === "pending" ? "rounded-l-md" : ""} ${
//                 tab.id === "declined" ? "rounded-r-md" : ""
//               }`}
//             >
//               <tab.icon className="w-4 h-4" />
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         <div className="rounded-lg border border-[#2D3A5C] bg-[#0B1638] overflow-hidden shadow-xl shadow-black/10">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="sticky top-0 bg-[#0B1638] shadow-sm">
//                 <tr className="border-b border-[#2D3A5C]">
//                   {[
//                     "Business Name",
//                     "Business Owner",
//                     "Amount",
//                     "Payment Period",
//                     "Date",
//                     "Business Category",
//                   ].map((header) => (
//                     <th
//                       key={header}
//                       onClick={() =>
//                         handleSort(header.toLowerCase().replace(/\s+/g, ""))
//                       }
//                       className="text-left py-3 px-4 text-sm font-medium text-white/60 hover:text-white cursor-pointer group"
//                     >
//                       <div className="flex items-center gap-2">
//                         {header}
//                         <ArrowUpDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAndSortedData.map((record, index) => (
//                   <tr
//                     key={index}
//                     className={`border-b border-[#2D3A5C] ${
//                       index % 2 === 0 ? "bg-[#0B1638]" : "bg-[#184466]"
//                     }`}
//                   >
//                     <td className="py-3 px-4 text-sm text-white">
//                       {record.businessName}
//                     </td>
//                     <td className="py-3 px-4 text-sm text-white/80">
//                       {record.businessOwner}
//                     </td>
//                     <td className="py-3 px-4 text-sm text-white/80">
//                       {record.amount}
//                     </td>
//                     <td className="py-3 px-4 text-sm text-white/80">
//                       {record.paymentPeriod}
//                     </td>
//                     <td className="py-3 px-4 text-sm text-white/80">
//                       {record.date}
//                     </td>
//                     <td className="py-3 px-4">
//                       <span
//                         className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                           record.category === "Restaurant"
//                             ? "bg-[#FFD700]/20 text-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.15)]"
//                             : record.category === "E-commerce"
//                             ? "bg-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
//                             : "bg-purple-500/20 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
//                         }`}
//                       >
//                         {record.category}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="border-t border-[#2D3A5C] p-4 flex justify-between items-center bg-[#0B1638]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0B1638]/60">
//             <button
//               className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors disabled:opacity-50"
//               disabled={page === 1}
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//             >
//               ← Previous
//             </button>
//             <div className="flex items-center gap-1">
//               {[1, 2, 3, "...", 67, 68].map((pageNum, i) => (
//                 <button
//                   key={i}
//                   onClick={() =>
//                     typeof pageNum === "number" && setPage(pageNum)
//                   }
//                   className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-all hover:text-white ${
//                     pageNum === page
//                       ? "bg-[#FFD700]/20 text-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.15)]"
//                       : typeof pageNum === "number"
//                       ? "text-white/60 hover:bg-white/5"
//                       : "text-white/60 cursor-default"
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               ))}
//             </div>
//             <button
//               className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors disabled:opacity-50"
//               disabled={page === 68}
//               onClick={() => setPage((p) => Math.min(68, p + 1))}
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

import { useSearch } from "@/components/SearchBar/SearchContext"; // ✅ Use SearchContext
import { StatusTabs } from "@/components/HistoryComponents/status-tabs";
import { HistoryTable } from "@/components/HistoryComponents/history-table";

export default function HistoryPage() {
  const [status, setStatus] = useState("pending");
  const { searchQuery } = useSearch(); // ✅ Get searchQuery from context

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Status Tabs */}
        <StatusTabs value={status} onValueChange={setStatus} />

        {/* ✅ Pass `searchQuery` from SearchContext to HistoryTable */}
        <HistoryTable status={status} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
