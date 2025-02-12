"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScoreCircle } from "@/components/ui/score-circle";
import { CheckCircle, MessageCircle, XCircle } from "lucide-react";
import { FinancialStatementAssessment } from "@/app/types/financialStatement";

interface BusinessAssessmentProps {
  data: FinancialStatementAssessment;
}

export default function BusinessAssessment({ data }: BusinessAssessmentProps) {
  return (
    <Card className="bg-[#0B2447] border-none shadow-lg overflow-hidden">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-white text-lg font-semibold">
          Business Assessment
        </CardTitle>
        <ScoreCircle score={data.financialScore} size="sm" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Select defaultValue="market">
            <SelectTrigger className="w-full bg-[#19376D] border-none text-white h-9 rounded-md text-sm">
              <SelectValue placeholder="Local Market Study" />
            </SelectTrigger>
            <SelectContent className="bg-[#19376D] border-none">
              <SelectItem
                value="market"
                className="text-white hover:bg-[#0B2447] text-sm"
              >
                Local Market Study
              </SelectItem>
              <SelectItem
                value="financial"
                className="text-white hover:bg-[#0B2447] text-sm"
              >
                Financial Analysis
              </SelectItem>
              <SelectItem
                value="risk"
                className="text-white hover:bg-[#0B2447] text-sm"
              >
                Risk Assessment
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          {[
            {
              label: "Loan feasibility",
              value: data.loanFeasibility,
              highlight: true,
            },
            { label: "Recommended amount", value: data.recommendedLoanAmount },
            { label: "Markup rate", value: data.interestRate },
            { label: "Payment period", value: data.paymentPeriod },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#19376D] p-3 rounded-md transition-colors hover:bg-[#19376D]/80 text-sm"
            >
              <span className="text-gray-300">{item.label}</span>
              <span
                className={`font-medium ${
                  item.highlight
                    ? "text-[#FFD700] font-semibold"
                    : "text-[#FFD700]"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => console.log("Approved")}
            className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium h-9 rounded-md transition-all duration-200 flex items-center justify-center gap-1 text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </Button>
          <Button
            onClick={() => console.log("Message")}
            variant="outline"
            className="flex-1 bg-black/20 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 font-medium h-9 rounded-md transition-all duration-200 flex items-center justify-center gap-1 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Message
          </Button>
          <Button
            onClick={() => console.log("Declined")}
            className="flex-1 bg-[#F44336] hover:bg-[#d32f2f] text-white font-medium h-9 rounded-md transition-all duration-200 flex items-center justify-center gap-1 text-sm"
          >
            <XCircle className="w-4 h-4" />
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
