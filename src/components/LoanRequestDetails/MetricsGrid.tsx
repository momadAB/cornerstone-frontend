import React from "react";

const MetricsGrid = ({ data }) => {
  const renderMetrics = () => {
    return Object.entries(data).map(([label, value]) => {
      // Special handling for Financial Score section
      if (label === "Financial Score and Business State") {
        return (
          <div key={label} className="p-4 bg-gray-800 rounded-lg">
            {value}
          </div>
        );
      }

      // Regular metrics
      return (
        <div key={label} className="p-4 bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-400">{label}</div>
          <div className="mt-1 text-lg font-semibold">{value}</div>
        </div>
      );
    });
  };

  return <div className="grid gap-4 w-full">{renderMetrics()}</div>;
};

export default MetricsGrid;
