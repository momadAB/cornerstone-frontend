"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchLoanRequest,
  LoanRequestResponse,
} from "@/app/api/actions/loanRequest";
import { axiosInstance } from "@/app/api/actions/config";

export default function CreateLoanResponse() {
  const params = useParams();
  const loanId = parseInt(params.loan_id, 10);

  // State for displaying the fetched loan data (GET request)
  const [loanData, setLoanData] = useState<LoanRequestResponse | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [errorData, setErrorData] = useState<string | null>(null);

  // State for handling the POST response form
  const [responseStatus, setResponseStatus] = useState("APPROVED");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("SIX_MONTHS");
  const [repaymentPlan, setRepaymentPlan] = useState("GRACE_PERIOD");
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [responseSuccess, setResponseSuccess] = useState<string | null>(null);

  // 1. Fetch the Loan Request data on load
  useEffect(() => {
    const getLoanData = async () => {
      try {
        const data = await fetchLoanRequest(loanId);
        setLoanData(data);
      } catch (err: any) {
        setErrorData(err.message);
      } finally {
        setLoadingData(false);
      }
    };

    if (loanId) {
      getLoanData();
    }
  }, [loanId]);

  // 2. Handle form submission for the POST request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingResponse(true);
    setResponseError(null);
    setResponseSuccess(null);

    // Prepare the POST payload
    const payload = {
      loanRequestId: String(loanId), // must be a string in the JSON
      responseStatus,
      reason,
      amount,
      loanTerm,
      repaymentPlan,
    };

    try {
      const res = await axiosInstance.post("/loan/response", payload);
      // If successful, you can display a success message or handle as needed
      setResponseSuccess("Loan response submitted successfully!");
    } catch (err: any) {
      setResponseError(
        err.response?.data?.message || "Error submitting loan response"
      );
    } finally {
      setLoadingResponse(false);
    }
  };

  // 3. Conditional states for fetching the GET data
  if (loadingData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
        <span className="ml-3 text-lg text-gray-700">
          Loading loan request data...
        </span>
      </div>
    );
  }

  if (errorData) {
    return (
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-md bg-red-50 p-4 text-red-600">
        <p>Error fetching loan request: {errorData}</p>
      </div>
    );
  }

  if (!loanData) {
    return (
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-md bg-gray-50 p-4 text-gray-700">
        <p>No loan data found.</p>
      </div>
    );
  }

  // Destructure the fetched loan data
  const { status: apiStatus, message, entity } = loanData;
  const {
    id,
    loanTitle,
    loanPurpose,
    amount: requestedAmount,
    loanTerm: requestedLoanTerm,
    repaymentPlan: requestedRepaymentPlan,
    status: loanStatus,
    statusDate,
    selectedBanks,
    business,
  } = entity;

  return (
    <div className="mx-auto mb-10 mt-6 w-full max-w-5xl px-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Loan Request Details
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          API Status: <span className="font-semibold">{apiStatus}</span> -{" "}
          {message}
        </p>
      </header>

      {/* --- Fetched Loan Info --- */}
      <section
        aria-labelledby="loan-info"
        className="mb-6 rounded-md border border-gray-200 bg-white p-4 shadow-sm"
      >
        <h2 id="loan-info" className="mb-2 text-xl font-semibold text-gray-700">
          Loan Information
        </h2>
        <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Request ID:</span>{" "}
              {id}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Title:</span>{" "}
              {loanTitle}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Purpose:</span>{" "}
              {loanPurpose}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">
                Requested Amount:
              </span>{" "}
              {requestedAmount}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Requested Term:</span>{" "}
              {requestedLoanTerm}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Requested Plan:</span>{" "}
              {requestedRepaymentPlan}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Loan Status:</span>{" "}
              {loanStatus}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Status Date:</span>{" "}
              {statusDate}
            </p>
          </div>
        </div>
      </section>

      {/* --- Business Info --- */}
      <section
        aria-labelledby="business-info"
        className="mb-6 rounded-md border border-gray-200 bg-white p-4 shadow-sm"
      >
        <h2
          id="business-info"
          className="mb-2 text-xl font-semibold text-gray-700"
        >
          Business Information
        </h2>
        <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Business ID:</span>{" "}
              {business.id}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Nickname:</span>{" "}
              {business.businessNickname}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">
                Financial Score:
              </span>{" "}
              {business.financialScore}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Business State:</span>{" "}
              {business.businessState}
            </p>
          </div>
        </div>

        {/* Owner Subsection */}
        <div className="mt-4 border-t border-gray-100 pt-4">
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            Business Owner
          </h3>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Name:</span>{" "}
            {business.businessOwnerUser.firstName}{" "}
            {business.businessOwnerUser.lastName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Username:</span>{" "}
            {business.businessOwnerUser.username}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Civil ID:</span>{" "}
            {business.businessOwnerUser.civilId}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Mobile:</span>{" "}
            {business.businessOwnerUser.mobileNumber}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Bank:</span>{" "}
            {business.businessOwnerUser.bank}
          </p>
        </div>
      </section>

      {/* --- Selected Banks --- */}
      <section
        aria-labelledby="selected-banks"
        className="mb-6 rounded-md border border-gray-200 bg-white p-4 shadow-sm"
      >
        <h2
          id="selected-banks"
          className="mb-2 text-xl font-semibold text-gray-700"
        >
          Selected Banks
        </h2>
        {selectedBanks && selectedBanks.length > 0 ? (
          <ul className="list-inside list-disc text-gray-600">
            {selectedBanks.map((bank) => (
              <li key={bank}>{bank}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No banks selected.</p>
        )}
      </section>

      {/* --- Financial Statement Highlights --- */}
      <section
        aria-labelledby="financial-statement"
        className="mb-6 rounded-md border border-gray-200 bg-white p-4 shadow-sm"
      >
        <h2
          id="financial-statement"
          className="mb-2 text-xl font-semibold text-gray-700"
        >
          Financial Statement Highlights
        </h2>
        <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Revenue:</span>{" "}
            {business.financialStatement.revenue}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Gross Profit:</span>{" "}
            {business.financialStatement.grossProfit}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Net Income:</span>{" "}
            {business.financialStatement.netIncome}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Total Assets:</span>{" "}
            {business.financialStatement.totalAssets}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">
              Total Liabilities:
            </span>{" "}
            {business.financialStatement.totalLiabilities}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Zakat Amount:</span>{" "}
            {business.financialStatement.zakatAmount}
          </p>
        </div>
      </section>

      {/* --- Form to POST Loan Response --- */}
      <section
        aria-labelledby="post-loan-response"
        className="mb-6 rounded-md border border-gray-200 bg-white p-4 shadow-sm"
      >
        <h2
          id="post-loan-response"
          className="mb-4 text-xl font-semibold text-gray-700"
        >
          Provide Your Loan Response
        </h2>

        {responseError && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-red-600">
            {responseError}
          </div>
        )}
        {responseSuccess && (
          <div className="mb-4 rounded-md bg-green-50 p-3 text-green-600">
            {responseSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* We already know loanRequestId from the URL, but you can display it for clarity */}
          <input type="hidden" value={loanId} readOnly />

          {/* responseStatus */}
          <div>
            <label
              htmlFor="responseStatus"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Response Status
            </label>
            <select
              id="responseStatus"
              value={responseStatus}
              onChange={(e) => setResponseStatus(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>

          {/* reason */}
          <div>
            <label
              htmlFor="reason"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Reason
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Enter reason or additional details"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* amount */}
          <div>
            <label
              htmlFor="amount"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Approved Amount
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* loanTerm */}
          <div>
            <label
              htmlFor="loanTerm"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Loan Term
            </label>
            <select
              id="loanTerm"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              <option value="SIX_MONTHS">SIX_MONTHS</option>
              <option value="ONE_YEAR">ONE_YEAR</option>
              <option value="TWO_YEARS">TWO_YEARS</option>
              {/* Add or remove any terms your API accepts */}
            </select>
          </div>

          {/* repaymentPlan */}
          <div>
            <label
              htmlFor="repaymentPlan"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Repayment Plan
            </label>
            <select
              id="repaymentPlan"
              value={repaymentPlan}
              onChange={(e) => setRepaymentPlan(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              <option value="GRACE_PERIOD">GRACE_PERIOD</option>
              <option value="STEP_UP">STEP_UP</option>
              <option value="FLAT">FLAT</option>
              {/* Add or remove any repayment plans your API accepts */}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loadingResponse}
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-70"
            >
              {loadingResponse ? "Submitting..." : "Submit Response"}
            </button>
          </div>
        </form>
      </section>

      {/* --- Raw JSON (Optional for debugging) --- */}
      <section
        aria-labelledby="raw-json"
        className="rounded-md border border-gray-200 bg-white p-4 shadow-sm"
      >
        <h2 id="raw-json" className="mb-2 text-lg font-semibold text-gray-700">
          Debug Data (Raw JSON)
        </h2>
        <pre className="overflow-x-auto rounded bg-gray-100 p-2 text-xs text-gray-700">
          {JSON.stringify(loanData, null, 2)}
        </pre>
      </section>
    </div>
  );
}
