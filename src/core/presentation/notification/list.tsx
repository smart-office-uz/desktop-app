import { NotificationEntity } from "@/core/entities/notification.entity";
import { Loader2 } from "lucide-react";
import { NotificationItem } from "./item";

interface Props {
  notifications: NotificationEntity[];
  isLoading: boolean;
}

export function NotificationList(props: Props) {
  const { notifications } = props;

  if (props.isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <ul className="space-y-4 max-h-[50vh] overflow-y-auto cursor-pointer">
      {notifications.map((notification, index) => (
        <NotificationItem notification={notification} index={index} />
      ))}
    </ul>
  );
}
