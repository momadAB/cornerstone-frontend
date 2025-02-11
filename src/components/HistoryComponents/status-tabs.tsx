"use client";

// StatusTabs.tsx
interface StatusTabsProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function StatusTabs({ value, onValueChange }: StatusTabsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onValueChange("")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
          value === ""
            ? "bg-white text-black shadow-md"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        All
      </button>
      <button
        onClick={() => onValueChange("null")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
          value === "null"
            ? "bg-[#FFD700] text-black shadow-md"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => onValueChange("APPROVED")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
          value === "APPROVED"
            ? "bg-[#FFD700] text-black shadow-md"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        Approved
      </button>
      <button
        onClick={() => onValueChange("REJECTED")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
          value === "REJECTED"
            ? "bg-[#FFD700] text-black shadow-md"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        Rejected
      </button>
    </div>
  );
}
