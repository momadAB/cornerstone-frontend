"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  // ✅ Optimized Pagination Logic Using useMemo
  const paginationNumbers = useMemo(() => {
    if (totalPages <= 1) return []; // No need for pagination if only one page

    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // Maximum number of pages before adding ellipsis

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const addEllipsis = () => {
      if (pages[pages.length - 1] !== "...") pages.push("...");
    };

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always show first page
        i === totalPages || // Always show last page
        Math.abs(i - currentPage) <= 1 // Show current, previous, and next pages
      ) {
        pages.push(i);
      } else if (i < currentPage && pages[pages.length - 1] !== "...") {
        addEllipsis();
      } else if (i > currentPage && pages[pages.length - 1] !== "...") {
        addEllipsis();
      }
    }
    return pages;
  }, [currentPage, totalPages]); // ✅ useMemo is called unconditionally

  if (paginationNumbers.length === 0) return null; // ✅ No rendering if there's only one page

  return (
    <div className="border-t border-[#2D3A5C] p-4 flex justify-between items-center">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`flex items-center gap-1 text-sm px-3 py-2 rounded transition-all ${
          currentPage === 1
            ? "text-gray-500 cursor-not-allowed opacity-50"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {paginationNumbers.map((page, index) => (
          <button
            key={
              typeof page === "number" ? `page-${page}` : `ellipsis-${index}`
            } // ✅ Ensure unique keys
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            aria-label={
              typeof page === "number" ? `Go to page ${page}` : "More pages"
            }
            className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-all ${
              page === currentPage
                ? "bg-[#FFD700]/20 text-[#FFD700] font-bold shadow-md"
                : typeof page === "number"
                ? "text-white/60 hover:bg-white/10 hover:text-white"
                : "text-white/40 cursor-default pointer-events-none"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`flex items-center gap-1 text-sm px-3 py-2 rounded transition-all ${
          currentPage === totalPages
            ? "text-gray-500 cursor-not-allowed opacity-50"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
