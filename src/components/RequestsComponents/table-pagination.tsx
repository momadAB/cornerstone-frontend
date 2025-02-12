import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex justify-center items-center gap-2 py-2">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-[#144272] text-white hover:bg-[#144272]/90 h-7 text-xs px-2 rounded-sm"
      >
        Previous
      </Button>
      <span className="text-white text-xs">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-[#144272] text-white hover:bg-[#144272]/90 h-7 text-xs px-2 rounded-sm"
      >
        Next
      </Button>
    </div>
  );
}
