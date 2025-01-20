import { useQuery } from "@tanstack/react-query";

// services
import { NotificationList } from "@/core/presentation/notification/list";
import NotificationService from "@/core/services/notification.service";

// widgets

export function UnReadNotifications() {
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
    <NotificationList
      isLoading={isFetchingUnReadNotifications || isLoadingUnReadNotifications}
      notifications={unReadNotifications ?? []}
    />
  );
}
