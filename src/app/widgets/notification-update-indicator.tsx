import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";

// components
import { Button } from "../components/button";

// services
import NotificationService from "@/core/services/notification.service";
import { updateAppIcon } from "@/lib/utils/update-tray-icon";
import { useMemo } from "react";

export const getNotificationCount = (): number => {
  return 5;
};

export const NotificationUpdateIndicator = () => {
  const data = useQuery({
    queryKey: ["notification-count"],
    queryFn: async () => {
      const notificationService = new NotificationService();
      return await notificationService.getLatestNotificationsCount();
    },
    experimental_prefetchInRender: true,
  });
  const notificationCount = data.data;

  useMemo(() => {
    if (data.isSuccess && data.data > 0) {
      updateAppIcon(data.data)
    }
  },
    [data])

  return (
    <Button className="relative rounded-2xl" variant="outline" size="icon">
      <span className="sr-only">Notifications</span>
      <Bell className="h-6 w-6" />
      {notificationCount !== undefined && notificationCount !== 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex w-5 h-5 p-2 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
          {notificationCount}
        </span>
      )}
    </Button>
  );
};
