interface PendingReviewProps {
  data: {
    dinarsInReview: number;
    pending: number;
  };
}

export default function PendingReview({ data }: PendingReviewProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Pending Review</h2>
      <p className="text-gray-600">
        Dinars in Review: {data.dinarsInReview.toFixed(2)} KWD
      </p>
      <p className="text-gray-600">Pending Requests: {data.pending}</p>
    </div>
  );
}
