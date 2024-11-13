import { useQuery } from "@tanstack/react-query";

// services
import NotificationService from "@/core/services/notification.service";

// widgets
import { Notifications } from "./notifications";

export const UnReadNotifications = () => {
  const {
    data: unReadNotifications,
    isFetching: isFetchingUnReadNotifications,
    isLoading: isLoadingUnReadNotifications,
  } = useQuery({
    queryKey: ["unread-notifications"],
    queryFn: async () => {
      const notificationService = new NotificationService();
      const notifications = await notificationService.getLatest();
      return notifications;
    },
  });

  return (
    <Notifications
      isLoading={isFetchingUnReadNotifications || isLoadingUnReadNotifications}
      notifications={unReadNotifications ?? []}
    />
  );
};
