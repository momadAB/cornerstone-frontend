import React, { useState } from "react";
import {
  approveLoanRequest,
  rejectLoanRequest,
  makeCounterOffer,
} from "@/app/api/actions/loanRequest";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle, Check, X, RefreshCw } from "lucide-react";

const LoanActions = ({
  loanDetails,
  onApprove,
  onReject,
  onCounterOffer,
  loanResponseStatus,
}) => {
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isCounterOfferOpen, setIsCounterOfferOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [counterOffer, setCounterOffer] = useState({
    amount: loanDetails?.amount || "",
    loanTerm: loanDetails?.loanTerm || "ONE_YEAR",
    repaymentPlan: loanDetails?.repaymentPlan || "EQUAL_INSTALLMENTS",
    reason: "",
  });

  console.log("statuses: ", loanDetails?.status, loanResponseStatus);
  if (loanResponseStatus) {
    return <></>;
  }

  const handleReject = () => {
    onReject(rejectReason);
    setIsRejectOpen(false);
    setRejectReason("");
  };

  const handleCounterOffer = () => {
    onCounterOffer(counterOffer);
    setIsCounterOfferOpen(false);
    setCounterOffer({
      amount: loanDetails?.amount || "",
      loanTerm: loanDetails?.loanTerm || "ONE_YEAR",
      repaymentPlan: loanDetails?.repaymentPlan || "EQUAL_INSTALLMENTS",
      reason: "",
    });
  };

  return (
    <div className="flex gap-2 mb-4">
      <Button
        onClick={onApprove}
        className="bg-yellow-500 hover:bg-yellow-400 text-black"
      >
        <Check className="w-4 h-4 mr-2 " color="#21130d" />
        Approve
      </Button>

      <Button
        onClick={() => setIsRejectOpen(true)}
        className=" hover:bg-red-700 border-red-500 hover:border-transparent bg-transparent border-2"
      >
        <X className="w-4 h-4 mr-2" />
        Reject
      </Button>

      <Button
        onClick={() => setIsCounterOfferOpen(true)}
        className="hover:bg-gold-400 border-yellow-500 hover:border-transparent bg-transparent border-2 hover:text-black"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Counter Offer
      </Button>

      <Button
        variant="outline"
        className="hover:bg-gold-400 border-yellow-500 hover:border-transparent bg-transparent border-2 hover:text-black"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Negotiate
      </Button>

      {/* Reject Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent className="bg-[#0B1638] border border-[#2D3A5C] text-white">
          <DialogHeader>
            <DialogTitle>Reject Loan Request</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please provide a reason for rejecting this request..."
              className="bg-[#142144] border-[#2D3A5C] text-white"
            />
          </div>
          <DialogFooter>
            <Button
              className=" hover:bg-red-700 border-red-500 hover:border-transparent bg-transparent border-2"
              onClick={() => setIsRejectOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              className="bg-yellow-500 hover:bg-yellow-400 text-black"
              disabled={!rejectReason.trim()}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Counter Offer Dialog */}
      <Dialog open={isCounterOfferOpen} onOpenChange={setIsCounterOfferOpen}>
        <DialogContent className="bg-[#0B1638] border border-[#2D3A5C] text-white">
          <DialogHeader>
            <DialogTitle>Make Counter Offer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">
                Amount (KWD)
              </label>
              <Input
                type="number"
                value={counterOffer.amount}
                onChange={(e) =>
                  setCounterOffer({ ...counterOffer, amount: e.target.value })
                }
                className="bg-[#142144] border-[#2D3A5C] text-white"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-2 block">
                Loan Term
              </label>
              <Select
                value={counterOffer.loanTerm}
                onValueChange={(value) =>
                  setCounterOffer({ ...counterOffer, loanTerm: value })
                }
              >
                <SelectTrigger className="bg-[#142144] border-[#2D3A5C] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#142144] border-[#2D3A5C] text-white">
                  <SelectItem value="SIX_MONTHS">6 Months</SelectItem>
                  <SelectItem value="ONE_YEAR">1 Year</SelectItem>
                  <SelectItem value="TWO_YEARS">2 Years</SelectItem>
                  <SelectItem value="FIVE_YEARS">5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-white/60 mb-2 block">
                Repayment Plan
              </label>
              <Select
                value={counterOffer.repaymentPlan}
                onValueChange={(value) =>
                  setCounterOffer({ ...counterOffer, repaymentPlan: value })
                }
              >
                <SelectTrigger className="bg-[#142144] border-[#2D3A5C] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#142144] border-[#2D3A5C] text-white">
                  <SelectItem value="EQUAL_INSTALLMENTS">
                    Equal Installments
                  </SelectItem>
                  <SelectItem value="BALLOON_PAYMENT">
                    Balloon Payment
                  </SelectItem>
                  <SelectItem value="STEP_UP">Step Up</SelectItem>
                  <SelectItem value="STEP_DOWN">Step Down</SelectItem>
                  <SelectItem value="LUMP_SUM">Lump Sum</SelectItem>
                  <SelectItem value="GRACE_PERIOD">Grace Period</SelectItem>
                  <SelectItem value="REVENUE_BASED">Revenue Based</SelectItem>
                  <SelectItem value="LEASE_TO_OWN">Lease to Own</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-white/60 mb-2 block">
                Reason for Counter Offer
              </label>
              <Textarea
                value={counterOffer.reason}
                onChange={(e) =>
                  setCounterOffer({ ...counterOffer, reason: e.target.value })
                }
                placeholder="Please provide a reason for the counter offer..."
                className="bg-[#142144] border-[#2D3A5C] text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className=" hover:bg-red-700 border-red-500 hover:border-transparent bg-transparent border-2"
              onClick={() => setIsCounterOfferOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCounterOffer}
              className="bg-yellow-600 hover:bg-yellow-700"
              disabled={!counterOffer.reason.trim() || !counterOffer.amount}
            >
              Submit Counter Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanActions;
