import { FinancialStatementAssessment } from "@/app/types/financialStatement";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data?: FinancialStatementAssessment;
}

export function FinancialLineChart({ data }: LineChartProps) {
  if (!data) {
    return <div className="text-white text-center p-3">No data available</div>;
  }

  const chartData = [
    { name: "Gross Margin", value: data.profitabilityGrossMargin ?? 0 },
    { name: "Net Margin", value: data.profitabilityNetMargin ?? 0 },
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
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#144272" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={75}
          tick={{ fill: "#9CA3AF", fontSize: 7 }}
        />
        <YAxis tick={{ fill: "#9CA3AF", fontSize: 7 }} />
        <Tooltip
          contentStyle={{ backgroundColor: "#0A2647", border: "none" }}
          labelStyle={{ color: "#FFD700" }}
          itemStyle={{ color: "#FFFFFF" }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#FFD700"
          strokeWidth={1.5}
          animationDuration={1400}
          animationEasing="ease-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
