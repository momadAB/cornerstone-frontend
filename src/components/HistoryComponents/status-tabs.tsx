"use client";

interface StatusTabsProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function StatusTabs({ value, onValueChange }: StatusTabsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onValueChange("all")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
          value === "all"
            ? "bg-white text-black shadow-md"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        All
      </button>
      <button
        onClick={() => onValueChange("pending")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
          value === "pending"
            ? "bg-[#FFD700] text-black shadow-md"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => onValueChange("approved")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
          value === "approved"
            ? "bg-green-500 text-white shadow-md"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        Approved
      </button>
      <button
        onClick={() => onValueChange("declined")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
          value === "declined"
            ? "bg-red-600 text-white shadow-md"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        Declined
      </button>
    </div>
  );
}
