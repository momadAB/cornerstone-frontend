export interface FinancialStatementAssessment {
  id: string;
  profitabilityGrossMargin: number;
  profitabilityNetMargin: number;
  profitabilityReturnOnAssets: number;
  profitabilityReturnOnEquity: number;
  leverageDebtToEquity: number;
  leverageDebtToAssets: number;
  operatingMargin: number;
  valuationDividendPayoutRatio: number;
  valuationEarningsPerShare: number;
  liquidityCurrentRatio: number;
  liquidityQuickRatio: number;
  marketPriceEarningsRatio: number;
  efficiencyAccountsReceivableTurnover: number;
  efficiencyAssetTurnover: number;
  solvencyInterestCoverageRatio: number;
  capitalBudgetingNetProfitFromOperatingCashFlow: number;
  financialScore: number;
  businessState: string;
  marketOverview: string;
  businessProspects: string;
  loanFeasibility: string;
  recommendedLoanAmount: string;
  interestRate: string;
  paymentPeriod: string;
}

export interface FinancialStatement {
  id: string;
  financialStatementAssessment: FinancialStatementAssessment;
  statementId: string;
  statementPeriod: string;
  revenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  operatingExpenses: number;
  netIncome: number;
  zakatAmount: number;
  totalAssets: number;
  cashAndCashEquivalents: number;
  accountsReceivable: number;
  ijaraAssets: number;
  totalLiabilities: number;
  accountsPayable: number;
  murabahaPayables: number;
  shareholderEquity: number;
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  netCashFlow: number;
  mudaraba: number;
  islamicComplianceCertification: string;
  dividendPayments: number;
}

export interface BusinessEntity {
  id: string;
  businessOwnerUser: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    civilId: string;
    mobileNumber: string;
    role: string;
    bank: string;
  };
  businessNickname: string;
  financialStatementFileId: string;
  businessLicenseImageFileId: string;
  financialStatement: FinancialStatement;
  businessLicense: {
    id: string;
    licenseNumber: string;
    issueDate: string;
    centralNumber: string;
    commercialRegistrationNumber: string;
    legalEntity: string;
    businessName: string;
    capital: string;
    fileNumber: string;
    expiryDate: string;
    civilAuthorityNumber: string;
    licenseType: string;
    registrationDate: string;
    activityName: string;
    activityCode: string;
    addressReferenceNumber: string;
    governorate: string;
    area: string;
    block: string;
    section: string;
    street: string;
    buildingName: string;
    floor: string;
    unitNumber: string;
    lastTransactionDate: string;
    requestNumber: string;
  };
  financialAnalysis: string;
  businessState: string;
  financialScore: number;
}

export interface ApiResponse {
  status: string;
  message: string;
  entity: BusinessEntity;
}
