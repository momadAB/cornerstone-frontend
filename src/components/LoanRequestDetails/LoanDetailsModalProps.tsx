import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  approveLoanRequest,
  fetchLoanRequest,
  makeCounterOffer,
  rejectLoanRequest,
} from "@/app/api/actions/loanRequest";
import FinancialScoreSection from "./FinancialScoreSection";
import LoanActions from "./LoanActionButtons";
import { Button } from "../ui/button";
import { downloadPDF } from "@/app/api/actions/downloadFile";
import { Download } from "lucide-react";

interface LoanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanId: number | null;
}

const formatBackendStrings = (input) => {
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

const formatDate = (dateString) =>
  !dateString
    ? "N/A"
    : new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

const formatCurrency = (amount) => {
  if (!amount) return "0.00 KWD";
  const numericValue =
    typeof amount === "string"
      ? Number(amount.replace(/,/g, ""))
      : Number(amount);
  return isNaN(numericValue)
    ? "0.00 KWD"
    : `${numericValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} KWD`;
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-1.5 border-b border-[#2D3A5C] last:border-0">
    <span className="text-white/60 text-sm">{label}</span>
    <span className="text-white text-sm font-medium">{value || "N/A"}</span>
  </div>
);

const MetricsGrid = ({ data }) => (
  <div className="grid grid-cols-1 gap-3">
    {Object.entries(data).map(([label, value]) => (
      <div key={label} className="bg-[#0B1638] p-2 rounded">
        <div className="text-xs text-white/60 mb-1">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    ))}
  </div>
);

const CounterOfferSection = ({ loanResponses }) => {
  if (!loanResponses || loanResponses.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Counter Offers</h3>
      {loanResponses.map((response, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <div className="bg-[#0B1638] p-3 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{response.bank}</span>
              <span
                className={`text-sm ${
                  response.status === "COUNTER_OFFER"
                    ? "text-yellow-400"
                    : response.status === "APPROVED"
                    ? "text-green-400"
                    : response.status === "REJECTED"
                    ? "text-red-400"
                    : "text-white"
                }`}
              >
                {formatBackendStrings(response.status)}
              </span>
            </div>
            <InfoRow label="Amount" value={formatCurrency(response.amount)} />
            <InfoRow
              label="Loan Term"
              value={formatBackendStrings(response.loanTerm)}
            />
            <InfoRow
              label="Repayment Plan"
              value={formatBackendStrings(response.repaymentPlan)}
            />
            {response.reason && (
              <InfoRow label="Reason" value={response.reason} />
            )}
            {/* {response.rejectionReason && (
              <InfoRow
                label="Rejection Reason"
                value={response.rejectionReason}
              />
            )} */}
            <InfoRow
              label="Response Date"
              value={formatDate(response.statusDate)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export function LoanDetailsModal({
  isOpen,
  onClose,
  loanId,
}: LoanDetailsModalProps) {
  const [loanDetails, setLoanDetails] = useState(null);
  const [status, setStatus] = useState(null);
  const [rejectionReason, setRejectionReason] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    const getLoanDetails = async () => {
      if (!loanId) return;
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchLoanRequest(loanId);
        console.log("RESPONSE: ", response);
        setStatus(response.responseStatus);
        setRejectionReason(response.rejectionReason);
        setChatId(response.chatId);
        setLoanDetails(response.entity);
      } catch (err) {
        setError("Failed to fetch loan details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && loanId) getLoanDetails();
  }, [isOpen, loanId]);

  const handleApprove = async () => {
    try {
      await approveLoanRequest(loanId.toString());
      onClose();
    } catch (error) {
      console.error("Error approving loan:", error);
    }
  };

  const formatBackendStrings = (input) => {
    return input
      .toLowerCase() // Convert to lowercase
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  };

  const handleReject = async (reason: string) => {
    try {
      await rejectLoanRequest(loanId.toString(), reason);
      onClose();
    } catch (error) {
      console.error("Error rejecting loan:", error);
    }
  };

  const handleCounterOffer = async (counterOffer) => {
    try {
      await makeCounterOffer(
        loanId.toString(),
        counterOffer.reason,
        counterOffer.amount.toString(),
        counterOffer.loanTerm,
        counterOffer.repaymentPlan
      );
      onClose();
    } catch (error) {
      console.error("Error making counter offer:", error);
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!loanDetails) return null;

  interface DownloadButtonProps {
    fileId: string;
  }
  const handleDownload = async (file, document) => {
    try {
      await downloadPDF(file, document);
      // alert("Download started!");
    } catch (error) {
      alert("Download failed!");
    }
  };

  const fs = loanDetails.business.financialStatement;
  const assessment = fs.financialStatementAssessment;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1638] border border-[#2D3A5C] text-white max-w-3xl max-h-[90vh] overflow-y-auto pt-0">
        <div className="sticky top-0 z-10 bg-[#0B1638] border-b-2 pt-7 mx-[-1em] px-[2em]">
          {" "}
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold flex justify-between items-center">
              <span>Loan Request #{loanId}</span>
              <span
                className={`text-sm ${
                  status === null
                    ? "text-yellow-400"
                    : {
                        PENDING: "text-yellow-400",
                        APPROVED: "text-green-400",
                        REJECTED: "text-red-400",
                      }[status] || "text-white"
                }`}
              >
                {console.log(loanDetails)}
                {/* {status || "PENDING"} */}
              </span>
            </DialogTitle>
          </DialogHeader>
          <LoanActions
            loanDetails={loanDetails}
            chatId={chatId}
            onApprove={handleApprove}
            onReject={handleReject}
            onCounterOffer={handleCounterOffer}
            loanResponseStatus={status}
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="ghost"
              className="border border-[#2D3A5C] bg-[#142144] text-white hover:bg-[#1E2A4A] hover:border-[#3A4E76] transition flex items-center gap-2"
              onClick={() =>
                handleDownload(
                  loanDetails.business.financialStatementFileId,
                  "financialStatement"
                )
              }
            >
              <Download size={18} />
              Financial Statement
            </Button>

            <Button
              variant="destructive"
              className="border border-[#2D3A5C] bg-[#142144] text-white hover:bg-[#1E2A4A] hover:border-[#3A4E76] transition flex items-center gap-2"
              onClick={() =>
                handleDownload(
                  loanDetails.business.businessLicenseImageFileId,
                  "businessLicense"
                )
              }
            >
              <Download size={18} />
              Business License
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-0 ">
          <TabsList className="bg-[#142144] mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="ratios">Ratios</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="bg-[#142144] border-[#2D3A5C]">
              <CardContent className="p-4 space-y-4">
                <div>
                  {/* {rejectionReason && (
                    <div className="mb-2">
                      <InfoRow
                        label="Rejection reason"
                        value={rejectionReason}
                      />
                    </div>
                  )} */}
                  <h3 className="text-sm font-medium mb-2">Loan Details</h3>
                  <InfoRow label="Title" value={loanDetails.loanTitle} />
                  <InfoRow
                    label="Amount"
                    value={formatCurrency(loanDetails.amount)}
                  />
                  <InfoRow label="Purpose" value={loanDetails.loanPurpose} />
                  <InfoRow
                    label="Term"
                    value={formatBackendStrings(loanDetails.loanTerm)}
                  />
                  <InfoRow
                    label="Repayment Plan"
                    value={formatBackendStrings(loanDetails.repaymentPlan)}
                  />
                </div>

                {loanDetails.loanResponses &&
                  loanDetails.loanResponses.length > 0 && (
                    <CounterOfferSection
                      loanResponses={loanDetails.loanResponses}
                    />
                  )}

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Business Information
                  </h3>
                  <InfoRow
                    label="Business Name"
                    value={loanDetails.business.businessLicense.businessName}
                  />
                  <InfoRow
                    label="Owner"
                    value={formatBackendStrings(
                      `${loanDetails.business.businessOwnerUser.firstName}_${loanDetails.business.businessOwnerUser.lastName}`
                    )}
                  />
                  <InfoRow
                    label="License Number"
                    value={loanDetails.business.businessLicense.licenseNumber}
                  />
                  <InfoRow
                    label="Activity"
                    value={loanDetails.business.businessLicense.activityName}
                  />
                  <InfoRow
                    label="Legal Entity"
                    value={loanDetails.business.businessLicense.legalEntity}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials">
            <Card className="bg-[#142144] border-[#2D3A5C]">
              <CardContent className="p-4 space-y-4">
                <MetricsGrid
                  data={{
                    Revenue: formatCurrency(fs.revenue),
                    "Cost of Goods": formatCurrency(fs.costOfGoodsSold),
                    "Gross Profit": formatCurrency(fs.grossProfit),
                    "Operating Expenses": formatCurrency(fs.operatingExpenses),
                    "Net Income": formatCurrency(fs.netIncome),
                    "Total Assets": formatCurrency(fs.totalAssets),
                    "Total Liabilities": formatCurrency(fs.totalLiabilities),
                    "Shareholder Equity": formatCurrency(fs.shareholderEquity),
                  }}
                />

                <div>
                  <h3 className="text-sm font-medium mb-2">Cash Flow</h3>
                  <MetricsGrid
                    data={{
                      "Operating Cash Flow": formatCurrency(
                        fs.operatingCashFlow
                      ),
                      "Investing Cash Flow": formatCurrency(
                        fs.investingCashFlow
                      ),
                      "Financing Cash Flow": formatCurrency(
                        fs.financingCashFlow
                      ),
                      "Net Cash Flow": formatCurrency(fs.netCashFlow),
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratios">
            <Card className="bg-[#142144] border-[#2D3A5C]">
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Profitability Ratios
                  </h3>
                  <MetricsGrid
                    data={{
                      "Gross Margin": `${(
                        assessment.profitabilityGrossMargin * 100
                      ).toFixed(1)}%`,
                      "Net Margin": `${(
                        assessment.profitabilityNetMargin * 100
                      ).toFixed(1)}%`,
                      "Return on Assets": `${(
                        assessment.profitabilityReturnOnAssets * 100
                      ).toFixed(1)}%`,
                      "Return on Equity": `${(
                        assessment.profitabilityReturnOnEquity * 100
                      ).toFixed(1)}%`,
                      "Operating Margin": `${(
                        assessment.operatingMargin * 100
                      ).toFixed(1)}%`,
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Leverage & Liquidity
                  </h3>
                  <MetricsGrid
                    data={{
                      "Debt to Equity":
                        assessment.leverageDebtToEquity.toFixed(2),
                      "Debt to Assets": `${(
                        assessment.leverageDebtToAssets * 100
                      ).toFixed(1)}%`,
                      "Current Ratio":
                        assessment.liquidityCurrentRatio.toFixed(2),
                      "Quick Ratio": assessment.liquidityQuickRatio.toFixed(2),
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Efficiency & Other Ratios
                  </h3>
                  <MetricsGrid
                    data={{
                      "Asset Turnover":
                        assessment.efficiencyAssetTurnover.toFixed(2),
                      "Accounts Receivable Turnover":
                        assessment.efficiencyAccountsReceivableTurnover.toFixed(
                          2
                        ),
                      "Dividend Payout": `${(
                        assessment.valuationDividendPayoutRatio * 100
                      ).toFixed(1)}%`,
                      "Net Profit from Operating Cash Flow": `${(
                        assessment.capitalBudgetingNetProfitFromOperatingCashFlow *
                        100
                      ).toFixed(1)}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment">
            <Card className="bg-[#142144] border-[#2D3A5C]">
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Key Metrics</h3>
                  <MetricsGrid
                    data={{
                      "": (
                        <FinancialScoreSection
                          score={loanDetails.business.financialScore}
                          businessState={loanDetails.business.businessState}
                          assessment={assessment}
                        />
                      ),
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Analysis</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-white/60 text-sm mb-1">
                        Market Overview
                      </div>
                      <div className="text-sm bg-[#0B1638] p-2 rounded">
                        {assessment.marketOverview}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">
                        Business Prospects
                      </div>
                      <div className="text-sm bg-[#0B1638] p-2 rounded">
                        {assessment.businessProspects}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
