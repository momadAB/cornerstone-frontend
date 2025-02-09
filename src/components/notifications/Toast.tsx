import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  BellRing,
  X,
  CreditCard,
  Phone,
  FileText,
  RefreshCw,
} from "lucide-react";

const Toast = ({ message, showToast, setShowToast }) => {
  if (!showToast || !message) return null;

  const notificationConfig = {
    NEW_MESSAGE: {
      icon: BellRing,
      title: "New Message",
      color: "blue",
      getDescription: (msg) => (
        <>
          <strong>{msg.businessName}:</strong> {msg.message}
        </>
      ),
    },
    NEW_LOAN_REQUEST: {
      icon: CreditCard,
      title: "New Loan Request",
      color: "green",
      getDescription: (msg) => `from ${msg.businessName}`,
    },
    BANKER_CALL: {
      icon: Phone,
      title: "Banker Call",
      color: "purple",
      getDescription: (msg) => `from ${msg.businessName}`,
    },
    LOAN_STATUS_CHANGE: {
      icon: FileText,
      title: "Loan Status Update",
      color: "orange",
      getDescription: (msg) => `from ${msg.businessName}`,
    },
    COUNTER_OFFER: {
      icon: RefreshCw,
      title: "Counter Offer",
      color: "yellow",
      getDescription: (msg) => `from ${msg.businessName}`,
    },
  };

  const config =
    notificationConfig[message.type] || notificationConfig["NEW_MESSAGE"];
  const Icon = config.icon;

  return (
    <div className="fixed top-16 right-4 z-50 max-w-sm animate-in slide-in-from-top-2">
      <Alert className={`bg-white border-${config.color}-200 shadow-lg`}>
        <Icon className={`h-4 w-4 text-${config.color}-500`} />
        <AlertTitle className="flex items-center gap-2 px-20">
          {config.title}
        </AlertTitle>
        <AlertDescription className="mt-2">
          {config.getDescription(message)}
        </AlertDescription>
        <button
          onClick={() => setShowToast(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  );
};

export default Toast;
