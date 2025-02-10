import React from "react";

const FinancialGauge = ({ score = 8.6, businessState = "STABLE" }) => {
  // Normalize score to percentage (0-100)
  const percentage = (score / 10) * 100;

  // Calculate arc path
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Map business state to colors - adjusted for dark background
  const getStateColor = (state) => {
    const colors = {
      EXCELLENT: "#4ade80", // green-400
      GOOD: "#a3e635", // lime-400
      STABLE: "#facc15", // yellow-400
      STRUGGLING: "#fb923c", // orange-400
      CRITICAL: "#f87171", // red-400
      BANKRUPT: "#fca5a5", // red-300
    };
    return colors[state] || colors.STABLE;
  };

  return (
    <div className="w-48 h-48 relative bg-transparent rounded-lg p-4 self-center items-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background arc */}
        <path
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          className="stroke-blue-700"
          fill="none"
          strokeWidth="10"
        />

        {/* Progress arc */}
        <path
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          fill="none"
          stroke={getStateColor(businessState)}
          strokeWidth="10"
          strokeLinecap="round"
          style={{
            strokeDasharray: strokeDasharray,
            strokeDashoffset: strokeDashoffset,
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-lg font-medium text-blue-100">
          {businessState}
        </span>
      </div>
    </div>
  );
};

export default FinancialGauge;
