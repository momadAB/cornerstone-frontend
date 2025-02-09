const NotificationList = ({ messages = [] }) => {
  const getNotificationContent = (msg) => {
    switch (msg.type) {
      case "NEW_MESSAGE":
        return {
          title: `New message from ${msg.businessName}`,
          content: msg.message,
        };

      case "NEW_LOAN_REQUEST":
        return {
          title: `New loan request from ${msg.businessName}`,
          content: `${msg.senderName} has submitted a new loan application`,
        };

      case "BANKER_CALL":
        return {
          title: `Scheduled call with ${msg.businessName}`,
          content: `${msg.senderName} would like to schedule a call`,
        };

      case "LOAN_STATUS_CHANGE":
        return {
          title: `Loan status update from ${msg.businessName}`,
          content: `Your loan status has been updated to: ${msg.message}`,
        };

      case "COUNTER_OFFER":
        return {
          title: `Counter offer from ${msg.businessName}`,
          content: `You have received a counter offer: ${msg.message}`,
        };

      default:
        return {
          title: msg.businessName,
          content: msg.message,
        };
    }
  };

  return messages.length > 0 ? (
    messages
      .slice()
      .reverse()
      .map((msg, index) => {
        const notification = getNotificationContent(msg);
        return (
          <div key={index} className="p-3 border-b hover:bg-gray-50">
            <div className="font-medium">{notification.title}</div>
            <div className="text-sm text-gray-600">{notification.content}</div>
          </div>
        );
      })
  ) : (
    <div className="p-3 text-center text-gray-500">No notifications</div>
  );
};

export default NotificationList;
