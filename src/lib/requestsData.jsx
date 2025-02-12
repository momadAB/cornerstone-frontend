import { historyData } from "@/lib/historyData"; // Import existing data

// Extract only pending requests
export const requestsData = historyData.filter(
  (record) => record.status === "pending"
);
