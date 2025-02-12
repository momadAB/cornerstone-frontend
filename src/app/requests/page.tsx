"use client";

import { useState } from "react";
import mockUsers from "../mocks/userMockData";
import { Header } from "@/components/RequestsComponents/header";
import { FinancialRatios } from "@/components/RequestsComponents/financial-ratios";
import BusinessAssessment from "@/components/RequestsComponents/business-assessment";
import { PendingRequests } from "@/components/RequestsComponents/pending-requests";

// Helper function for consistent date formatting
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(mockUsers[0].id);

  const mockRequests = mockUsers.map((user) => ({
    id: user.id,
    businessOwner: `${user.businessOwnerUser.firstName} ${user.businessOwnerUser.lastName}`,
    businessName: user.businessLicense.businessName,
    amount:
      user.financialStatement.financialStatementAssessment
        .recommendedLoanAmount,
    paymentPeriod:
      user.financialStatement.financialStatementAssessment.paymentPeriod,
    date: formatDate(new Date()), // Use consistent date formatting
    category: user.businessLicense.activityName,
  }));

  const currentUser =
    mockUsers.find((user) => user.id === currentUserId) || mockUsers[0];

  const handleRequestClick = (id: string) => {
    setCurrentUserId(id);
  };

  return (
    <div className="min-h-screen bg-[#05182C] p-6">
      <div className="space-y-6">
        <Header businessName={currentUser.businessLicense.businessName} />

        <div className="grid md:grid-cols-2 gap-4">
          <FinancialRatios
            data={currentUser.financialStatement.financialStatementAssessment}
          />
          <BusinessAssessment
            data={currentUser.financialStatement.financialStatementAssessment}
          />
        </div>

        <PendingRequests
          requests={mockRequests}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onRequestClick={handleRequestClick}
        />
      </div>
    </div>
  );
}
