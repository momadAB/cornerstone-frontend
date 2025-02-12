export interface BusinessOwnerUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  civilId: string;
  mobileNumber: string;
  role: string;
  bank: string;
}

export interface FinancialStatementAssessment {
  id: string;
  profitabilityGrossMargin: string;
  profitabilityNetMargin: string;
  profitabilityReturnOnAssets: string;
  profitabilityReturnOnEquity: string;
  leverageDebtToEquity: string;
  leverageDebtToAssets: string;
  operatingMargin: string;
  valuationDividendPayoutRatio: string;
  valuationEarningsPerShare: string;
  liquidityCurrentRatio: string;
  liquidityQuickRatio: string;
  marketPriceEarningsRatio: string;
  efficiencyAccountsReceivableTurnover: string;
  efficiencyAssetTurnover: string;
  solvencyInterestCoverageRatio: string;
  capitalBudgetingNetProfitFromOperatingCashFlow: string;
  financialScore: string;
  businessState: string;
  marketOverview: string;
  businessProspects: string;
  loanFeasibility: string;
  recommendedLoanAmount: string;
  interestRate: string;
  paymentPeriod: string;
}

export interface BusinessLicense {
  id: string;
  licenseNumber: string;
  businessName: string;
  expiryDate: string;
  activityName: string;
  // ... other fields as needed
}

export interface FinancialStatement {
  id: string;
  financialStatementAssessment: FinancialStatementAssessment;
  statementId: string;
  statementPeriod: string;
  // ... other fields as needed
}

export interface ApiResponse {
  status: string;
  message: string;
  entity: {
    id: string;
    businessOwnerUser: BusinessOwnerUser;
    businessNickname: string;
    financialStatementFileId: string;
    businessLicenseImageFileId: string;
    financialStatement: FinancialStatement;
    businessLicense: BusinessLicense;
    financialAnalysis: string;
    businessState: string;
    financialScore: string;
  };
}
