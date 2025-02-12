import { FinancialStatementAssessment } from "@/app/types/financialStatement";

interface RatioTableProps {
  data?: FinancialStatementAssessment;
}

export function RatioTable({ data }: RatioTableProps) {
  if (!data) {
    return <div className="text-white text-center p-4">No data available</div>;
  }

  const ratios = [
    { name: "Gross Margin", value: data.profitabilityGrossMargin ?? 1 },
    { name: "Net Margin", value: data.profitabilityNetMargin ?? 1 },
    { name: "Return on Assets", value: data.profitabilityReturnOnAssets ?? 0 },
    { name: "Return on Equity", value: data.profitabilityReturnOnEquity ?? 0 },
    { name: "Debt to Equity", value: data.leverageDebtToEquity ?? 0 },
    { name: "Debt to Assets", value: data.leverageDebtToAssets ?? 0 },
    { name: "Operating Margin", value: data.operatingMargin ?? 0 },
    {
      name: "Dividend Payout Ratio",
      value: data.valuationDividendPayoutRatio ?? 0,
    },
    { name: "Earnings Per Share", value: data.valuationEarningsPerShare ?? 0 },
    { name: "Current Ratio", value: data.liquidityCurrentRatio ?? 0 },
    { name: "Quick Ratio", value: data.liquidityQuickRatio ?? 0 },
    { name: "P/E Ratio", value: data.marketPriceEarningsRatio ?? 0 },
    {
      name: "Accounts Receivable Turnover",
      value: data.efficiencyAccountsReceivableTurnover ?? 0,
    },
    { name: "Asset Turnover", value: data.efficiencyAssetTurnover ?? 0 },
    {
      name: "Interest Coverage Ratio",
      value: data.solvencyInterestCoverageRatio ?? 0,
    },
    {
      name: "Net Profit from Operating CF",
      value: data.capitalBudgetingNetProfitFromOperatingCashFlow ?? 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-8 max-h-[400px] overflow-y-auto pr-2">
      {ratios.map((ratio) => (
        <div
          key={ratio.name}
          className="flex justify-between items-center text-sm py-2 border-b border-[#144272]"
        >
          <span className="text-gray-300">{ratio.name}</span>
          <span className="text-white font-medium">
            {ratio.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}
