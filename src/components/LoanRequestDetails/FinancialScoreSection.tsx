import React from "react";
import FinancialGauge from "./FinancialGauge";

const FinancialScoreSection = ({ score, businessState, assessment }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KWD",
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-2 items-center justify-center space-x-4 w-full">
      <div className="flex-shrink-0 w-48 flex items-center justify-center m-auto">
        <FinancialGauge score={score} businessState={businessState} />
      </div>

      <div className="flex flex-col space-y-3 flex-grow">
        <div className="text-sm space-y-2">
          <div>
            <span className="text-gray-400">Loan Feasibility:</span>{" "}
            <span
              className={`${
                assessment.loanFeasibility === "Yes"
                  ? "text-yellow-400"
                  : "text-red-400"
              } font-bold`}
            >
              {assessment.loanFeasibility}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Recommended Amount:</span>{" "}
            <span className="font-semibold">
              {formatCurrency(assessment.recommendedLoanAmount)}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Markup Rate:</span>{" "}
            <span className="font-semibold">{assessment.interestRate}</span>
          </div>
          <div>
            <span className="text-gray-400">Payment Period:</span>{" "}
            <span className="font-semibold">{assessment.paymentPeriod}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialScoreSection;
