import { Badge } from "@/components/ui/badge";

const history = [
  {
    businessName: "Janna's Gourmet Bistro",
    amount: "2,400 KWD",
    period: "3 months",
    status: "Approved",
  },
];

export function RecentHistory() {
  return (
    <div className="bg-[#0D2137] rounded-lg p-4">
      <h2 className="text-white font-semibold mb-4">Recent History</h2>
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.businessName}
            className="flex items-center justify-between p-3 hover:bg-[#162B3F] rounded-lg cursor-pointer"
          >
            <div className="space-y-1">
              <h3 className="text-white font-medium">{item.businessName}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{item.amount}</span>
                <span>•</span>
                <span>{item.period}</span>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-500">
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
