import { Bell } from "lucide-react";

// components
import { Button } from "@/app/components/button";

// use cases
import { useGetNumberOfUnreadNotifications } from "@/core/use-cases/notifications/get-number-of-unread-notifications";

export function NotificationUpdateIndicator() {
  const notificationsCount = useGetNumberOfUnreadNotifications();

  return (
    <Button className="relative rounded-2xl" variant="outline" size="icon">
      <span className="sr-only">Notifications</span>
      <Bell className="h-6 w-6" />
      {notificationsCount !== 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex w-5 h-5 p-2 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
          {notificationsCount}
        </span>
      )}
    </Button>
  );
}
