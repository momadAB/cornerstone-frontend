"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchLoanRequest,
  LoanRequestResponse,
} from "@/app/api/actions/loanRequest";

const CreateLoanResponse = () => {
  const params = useParams();
  const loanId = parseInt(params.loan_id, 10);

  const [loanData, setLoanData] = useState<LoanRequestResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLoanData = async () => {
      try {
        const data = await fetchLoanRequest(loanId);
        setLoanData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (loanId) {
      getLoanData();
    }
  }, [loanId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!loanData) return <div>No data found.</div>;

  const { status, message, entity } = loanData;
  const {
    id,
    business,
    loanTitle,
    loanPurpose,
    amount,
    loanTerm,
    repaymentPlan,
    status: loanStatus,
    statusDate,
    // selectedBanks,
  } = entity;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Loan Request Details</h1>
      <p>
        <strong>Request ID:</strong> {id}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>API Message:</strong> {message}
      </p>
      <hr />

      <section>
        <h2>Loan Information</h2>
        <p>
          <strong>Title:</strong> {loanTitle}
        </p>
        <p>
          <strong>Purpose:</strong> {loanPurpose}
        </p>
        <p>
          <strong>Amount:</strong> {amount}
        </p>
        <p>
          <strong>Term:</strong> {loanTerm}
        </p>
        <p>
          <strong>Repayment Plan:</strong> {repaymentPlan}
        </p>
        <p>
          <strong>Loan Status:</strong> {loanStatus}
        </p>
        <p>
          <strong>Status Date:</strong> {statusDate}
        </p>
      </section>

      <hr />

      <section>
        <h2>Business Information</h2>
        <p>
          <strong>Business ID:</strong> {business.id}
        </p>
        <p>
          <strong>Nickname:</strong> {business.businessNickname}
        </p>

        <h3>Business Owner</h3>
        <p>
          <strong>Name:</strong>{" "}
          {`${business.businessOwnerUser.firstName} ${business.businessOwnerUser.lastName}`}
        </p>
        <p>
          <strong>Username:</strong> {business.businessOwnerUser.username}
        </p>
        <p>
          <strong>Civil ID:</strong> {business.businessOwnerUser.civilId}
        </p>
        <p>
          <strong>Mobile:</strong> {business.businessOwnerUser.mobileNumber}
        </p>
        <p>
          <strong>Bank:</strong> {business.businessOwnerUser.bank}
        </p>

        <h3>Financial Score & State</h3>
        <p>
          <strong>Financial Score:</strong> {business.financialScore}
        </p>
        <p>
          <strong>Business State:</strong> {business.businessState}
        </p>
      </section>

      <hr />

      <hr />

      <section>
        <h2>Financial Statement Highlights</h2>
        <p>
          <strong>Revenue:</strong> {business.financialStatement.revenue}
        </p>
        <p>
          <strong>Gross Profit:</strong>{" "}
          {business.financialStatement.grossProfit}
        </p>
        <p>
          <strong>Net Income:</strong> {business.financialStatement.netIncome}
        </p>
        <p>
          <strong>Total Assets:</strong>{" "}
          {business.financialStatement.totalAssets}
        </p>
        <p>
          <strong>Total Liabilities:</strong>{" "}
          {business.financialStatement.totalLiabilities}
        </p>
        <p>
          <strong>Financial Score:</strong>{" "}
          {business.financialStatementAssessment?.financialScore || "N/A"}
        </p>
      </section>

      <hr />

      {/* <section>
        <h2>Complete Raw Data (for debugging)</h2>
        <pre>{JSON.stringify(loanData, null, 2)}</pre>
      </section> */}
    </div>
  );
};

export default CreateLoanResponse;
