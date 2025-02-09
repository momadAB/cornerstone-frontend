interface HistoryItem {
  date: string;
  amount: number;
  businessName: string;
  id: number;
  title: string;
  status: string;
}

interface RecentHistoryProps {
  history: HistoryItem[];
}

export default function RecentHistory({ history }: RecentHistoryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent History</h2>
      <ul className="space-y-4">
        {history.map((item) => (
          <li key={item.id} className="border-b pb-2">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-600">{item.businessName}</p>
            <p className="text-sm text-gray-600">
              {new Date(item.date).toLocaleDateString()}
            </p>
            <p className="text-sm font-semibold">
              {item.amount.toFixed(2)} KWD
            </p>
            <p
              className={`text-sm ${
                item.status === "APPROVED"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {item.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
