// loanRequest.ts

import { baseUrl, axiosInstance } from "./config";

/**
 * Interface describing the shape of the response for a single loan request.
 */
export interface LoanRequestResponse {
  status: string;
  message: string;
  entity: {
    id: number;
    business: {
      id: number;
      businessOwnerUser: {
        id: number;
        firstName: string;
        lastName: string;
        username: string;
        civilId: string;
        mobileNumber: string;
        role: string;
        bank: string;
      };
      businessNickname: string;
      financialStatementFileId: number;
      businessLicenseImageFileId: number;
      financialStatement: {
        id: number;
        financialStatementAssessment: {
          id: number;
          profitabilityGrossMargin: number;
          profitabilityNetMargin: number;
          profitabilityReturnOnAssets: number;
          profitabilityReturnOnEquity: number;
          leverageDebtToEquity: number;
          leverageDebtToAssets: number;
          operatingMargin: number;
          valuationDividendPayoutRatio: number;
          valuationEarningsPerShare: number | null;
          liquidityCurrentRatio: number;
          liquidityQuickRatio: number;
          marketPriceEarningsRatio: number | null;
          efficiencyAccountsReceivableTurnover: number;
          efficiencyAssetTurnover: number;
          solvencyInterestCoverageRatio: number | null;
          capitalBudgetingNetProfitFromOperatingCashFlow: number;
          financialScore: number;
          businessState: string;
          marketOverview: string;
          businessProspects: string;
          loanFeasibility: string;
          recommendedLoanAmount: number;
          interestRate: string;
          paymentPeriod: string;
        };
        statementId: number | null;
        statementPeriod: string;
        revenue: string;
        costOfGoodsSold: string;
        grossProfit: string;
        operatingExpenses: string;
        netIncome: string;
        zakatAmount: string;
        totalAssets: string;
        cashAndCashEquivalents: string;
        accountsReceivable: string;
        ijaraAssets: string;
        totalLiabilities: string;
        accountsPayable: string;
        murabahaPayables: string;
        shareholderEquity: string;
        operatingCashFlow: string;
        investingCashFlow: string;
        financingCashFlow: string;
        netCashFlow: string;
        mudaraba: string;
        islamicComplianceCertification: string;
        dividendPayments: string;
      };
      businessLicense: {
        id: number;
        licenseNumber: string | null;
        issueDate: string | null;
        centralNumber: string | null;
        commercialRegistrationNumber: string | null;
        legalEntity: string | null;
        businessName: string | null;
        capital: string | null;
        fileNumber: string | null;
        expiryDate: string | null;
        civilAuthorityNumber: string | null;
        licenseType: string | null;
        registrationDate: string | null;
        activityName: string | null;
        activityCode: string | null;
        addressReferenceNumber: string | null;
        governorate: string | null;
        area: string | null;
        block: string | null;
        section: string | null;
        street: string | null;
        buildingName: string | null;
        floor: string | null;
        unitNumber: string | null;
        lastTransactionDate: string | null;
        requestNumber: string | null;
      };
      financialAnalysis: string;
      businessState: string;
      financialScore: number;
    };
    selectedBanks: string[];
    requestAnalysis: string;
    loanTitle: string;
    loanPurpose: string;
    amount: number;
    loanTerm: string;
    repaymentPlan: string;
    status: string;
    rejectionSource: string;
    reason: string | null;
    statusDate: string;
    loanRequestNotifications: any[];
    loanResponses: any[];
  };
}

/**
 * Fetch a Loan Request by ID (hardcoded to 1 in this example).
 */
export async function fetchLoanRequest(
  loanId: number
): Promise<LoanRequestResponse> {
  try {
    // Construct the endpoint using the passed-in loanId
    const response = await axiosInstance.get(`/loan/request/${loanId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching loan request data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch loan request data"
    );
  }
}
