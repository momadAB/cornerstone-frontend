import React from "react";
import Chat from "../../components/notifications/ChatApp";
import Dashboard from "./components/Dashboard";

const page = () => {
  return (
    <div>
      <Dashboard />
      <Chat></Chat>
    </div>
  );
};

export default page;
