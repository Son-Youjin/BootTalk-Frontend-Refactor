import NotificationCard from "./NotificationCard";
import { NotificationItem } from "@/types/response";

interface Props {
  notifications: NotificationItem[];
  onClose: () => void;
}

const NotificationList = ({ notifications, onClose }: Props) => {
  return (
    <div className="bg-white">
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-sm font-medium text-gray-700">
            새로운 알림이 없습니다.
          </p>

          <p className="mt-1 text-xs text-gray-400">
            알림이 오면 이곳에 표시됩니다.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.notificationId}
              notification={notification}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
