"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, PieChart, LineChart, Table } from "lucide-react";
import { FinancialStatementAssessment } from "@/app/types/financialStatement";
import { FinancialBarChart } from "../chartsComponents/bar-chart";
import { FinancialPieChart } from "../chartsComponents/pie-chart";
import { FinancialLineChart } from "../chartsComponents/line-chart";
import { RatioTable } from "../chartsComponents/ratio-table";

interface FinancialRatiosProps {
  data?: FinancialStatementAssessment;
}

type ViewType = "bar" | "pie" | "line" | "table";

type ChartType = {
  type: ViewType;
  label: string;
  icon: React.ElementType;
};

export function FinancialRatios({ data }: FinancialRatiosProps) {
  const [viewType, setViewType] = useState<ViewType>("bar");

  const chartTypes: ChartType[] = useMemo(
    () => [
      { type: "bar", label: "Bar", icon: BarChart2 },
      { type: "pie", label: "Pie", icon: PieChart },
      { type: "line", label: "Line", icon: LineChart },
      { type: "table", label: "Table", icon: Table },
    ],
    []
  );

  const renderChart = () => {
    if (!data) {
      return (
        <div className="text-white text-center p-3">
          No financial data available
        </div>
      );
    }

    switch (viewType) {
      case "bar":
        return <FinancialBarChart data={data} />;
      case "pie":
        return <FinancialPieChart data={data} />;
      case "line":
        return <FinancialLineChart data={data} />;
      case "table":
        return <RatioTable data={data} />;
    }
  };

  return (
    <Card className="bg-[#0A2647] border-none shadow-md">
      <CardHeader className="pb-1 flex flex-row items-center justify-between">
        <CardTitle className="text-white text-lg font-semibold">
          Financial Ratios
        </CardTitle>
        <div
          className="inline-flex rounded-md shadow-sm p-0.5 bg-[#1D3A5F]"
          role="group"
        >
          {chartTypes.map((chart) => (
            <Button
              key={chart.type}
              onClick={() => setViewType(chart.type)}
              variant="ghost"
              size="sm"
              className={`
                ${
                  viewType === chart.type
                    ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A2647]"
                    : "text-white hover:text-[#FFD700]"
                }
                transition-all duration-200 ease-in-out
                rounded-md
                px-1.5 py-0.5 mx-0.5
                flex items-center justify-center
                focus:outline-none focus:ring-1 focus:ring-[#FFD700] focus:ring-opacity-50
              `}
            >
              <chart.icon
                className={`w-3.5 h-3.5 ${
                  viewType === chart.type ? "text-[#0A2647]" : "text-[#FFD700]"
                }`}
              />
              <span className="font-medium text-[10px] ml-0.5 hidden sm:inline">
                {chart.label}
              </span>
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-3">{renderChart()}</CardContent>
    </Card>
  );
}
