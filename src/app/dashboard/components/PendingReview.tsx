"use client";
import { CircleDollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

interface PendingReviewProps {
  data: {
    dinarsInReview: number;
    pending: number;
  };
}

export default function PendingReview({ data }: PendingReviewProps) {
  const router = useRouter();

  function formatNumber(num: number): string {
    const absNum = Math.abs(num);
    if (absNum >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    }
    if (absNum >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (absNum >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <CircleDollarSign className="text-[#FFD700] invisible" size={20} />
        <p className="text-white font-extrabold text-lg invisible">
          Recent Notifications
        </p>
      </div>
      <div className="bg-[#184466] p-6 rounded-3xl shadow-md text-white">
        <div className="flex justify-between">
          <h2 className="text-md mb-4 mr-6">Pending Review</h2>
          <CircleDollarSign className="text-[#FFD700]" />
        </div>
        <p className="text-3xl font-bold">
          {formatNumber(data.dinarsInReview)} KD
        </p>
        <p className="text-sm pt-3">In {data.pending} applications</p>
        <button
          onClick={() => router.push("/history")}
          className="w-full bg-[#FFD700] text-black rounded-md text-sm font-bold mt-4 p-1 font-maven
          transition-all duration-200 ease-in-out
          hover:bg-[#ffc400] hover:shadow-lg hover:scale-[1.02]
          active:bg-[#f0b900] active:scale-[0.98] active:shadow-md"
        >
          View requests
        </button>
      </div>
    </div>
  );
}
