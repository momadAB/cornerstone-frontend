interface Request {
  date: string;
  amount: number;
  businessName: string;
  id: number;
  title: string;
}

interface RecentRequestsProps {
  requests: Request[];
}

export default function RecentRequests({ requests }: RecentRequestsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
      <ul className="space-y-4">
        {requests.map((request) => (
          <li key={request.id} className="border-b pb-2">
            <p className="font-medium">{request.title}</p>
            <p className="text-sm text-gray-600">{request.businessName}</p>
            <p className="text-sm text-gray-600">
              {new Date(request.date).toLocaleDateString()}
            </p>
            <p className="text-sm font-semibold">
              {request.amount.toFixed(2)} KWD
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
