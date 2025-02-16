import { Banknote, Bell, MessageSquare } from "lucide-react";

interface NotificationType {
  id: number;
  message: string;
  type: string;
  businessName: string;
  senderFirstName: string;
}

interface NotificationsData {
  notifications: NotificationType[];
  totalCount?: number;
  unreadCount?: number;
}

interface RecentNotificationsProps {
  notifications: NotificationsData | null;
}

export default function RecentNotifications({
  notifications,
}: RecentNotificationsProps) {
  const formatNotification = (notification: NotificationType) => {
    switch (notification.type) {
      case "NEW_LOAN_REQUEST":
        return (
          <div className="flex items-center gap-3">
            <Banknote className="text-[#FFD700]" size={20} />
            <span>
              New loan request from{" "}
              <span className="text-[#FFD700]">
                {notification.businessName}
              </span>
            </span>
          </div>
        );
      case "NEW_MESSAGE":
        return (
          <div className="flex items-center gap-3">
            <MessageSquare className="text-[#FFD700]" size={20} />
            <span>
              New message from{" "}
              <span className="text-[#FFD700]">
                {notification.businessName}
              </span>
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  // Get the notifications array safely
  const notificationList = notifications?.notifications || [];

  return (
    <>
      <div className="flex flex-col w-96">
        <div className="flex items-center gap-2 mb-2 ml-5">
          <Bell className="text-[#FFD700]" size={20} />
          <p className="text-white font-extrabold text-lg">
            Recent Notifications
          </p>
        </div>
        <div className="bg-[#184466] rounded-3xl shadow-md h-[197px] w-full text-white">
          <div className="flex flex-col h-full divide-y divide-transparent">
            {notificationList.slice(0, 3).map((notification, index) => (
              <div
                key={notification.id}
                className={`flex-1 flex items-center p-5 ${
                  index === 1 ? "bg-[#133652]" : ""
                }`}
              >
                <div className="text-sm">
                  {formatNotification(notification)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
