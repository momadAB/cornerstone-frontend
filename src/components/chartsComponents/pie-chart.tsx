import { FinancialStatementAssessment } from "@/app/types/financialStatement";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type {
  NameType,
  ValueType,
  Payload,
} from "recharts/types/component/DefaultTooltipContent";

interface PieChartProps {
  data?: FinancialStatementAssessment;
}

const COLORS = [
  "#FFD700",
  "#FFA500",
  "#FF6347",
  "#FF69B4",
  "#9370DB",
  "#20B2AA",
  "#32CD32",
  "#4682B4",
  "#BA55D3",
  "#CD853F",
];

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#FFFFFF"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="14"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function FinancialPieChart({ data }: PieChartProps) {
  if (!data) {
    return <div className="text-white text-center p-4">No data available</div>;
  }

  const chartData = [
    { name: "Gross Margin", value: data.profitabilityGrossMargin ?? 0 },
    { name: "Net Margin", value: data.profitabilityNetMargin ?? 0 },
    { name: "Return on Assets", value: data.profitabilityReturnOnAssets ?? 0 },
    { name: "Return on Equity", value: data.profitabilityReturnOnEquity ?? 0 },
    { name: "Operating Margin", value: data.operatingMargin ?? 0 },
  ].sort((a, b) => b.value - a.value);

  const customTooltipFormatter = (
    value: ValueType,
    name: NameType,
    entry?: Payload<ValueType, NameType>
  ) => {
    const numericValue =
      typeof value === "number" ? value.toFixed(2) : String(value);
    const percentage = entry?.payload?.percent
      ? `(${(entry.payload.percent * 100).toFixed(1)}%)`
      : "";

    return [`${numericValue} ${percentage}`, name];
  };

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={96} // Reduced by 20%
          fill="#8884d8"
          dataKey="value"
          animationDuration={2000}
          animationEasing="ease-out"
          label={CustomLabel}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip<ValueType, NameType>
          contentStyle={{
            backgroundColor: "#0A2647",
            border: "none",
            borderRadius: "4px",
            padding: "10px",
          }}
          labelStyle={{
            color: "#FFD700",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
          itemStyle={{ color: "#FFFFFF" }}
          formatter={customTooltipFormatter}
        />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{
            paddingLeft: "20px",
            fontSize: "12px",
          }}
          formatter={(value: string) => (
            <span style={{ color: "#FFFFFF" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
