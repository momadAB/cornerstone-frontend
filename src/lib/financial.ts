export interface FinancialRatios {
  grossMargin: number;
  netMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  debtToEquity: number;
  debtToAssets: number;
  operatingMargin: number;
  dividendPayoutRatio: number;
  earningsPerShare: number;
  currentRatio: number;
  quickRatio: number;
  priceEarningsRatio: number;
  accountsReceivableTurnover: number;
  assetTurnover: number;
  interestCoverageRatio: number;
  netProfitFromOperatingCF: number;
}

export interface BusinessAssessment {
  loanFeasibility: boolean;
  recommendedAmount: number;
  markupRate: number;
  paymentPeriod: number;
  score: number;
  status: string;
}

export interface HistoryRecord {
  id: string;
  businessName: string;
  requestDate: string;
  amount: number;
  status: string;
  financialRatios: FinancialRatios;
  assessment: BusinessAssessment;
}
