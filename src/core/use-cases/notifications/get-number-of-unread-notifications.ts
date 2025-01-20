import { useQuery } from "@tanstack/react-query";

// services
import NotificationService from "@/core/services/notification.service";

type ReturnType = number;

export function useGetNumberOfUnreadNotifications(): ReturnType {
  const query = useQuery({
    queryKey: ["notification-count"],
    queryFn: async () => {
      const notificationService = new NotificationService();
      const notificationsCount =
        await notificationService.getLatestNotificationsCount();
      return notificationsCount ?? 0;
    },
  });

  function hasQuerySuccessfullyFinished(
    notificationsCount: number | undefined
  ): notificationsCount is number {
    return notificationsCount !== undefined;
  }

  if (hasQuerySuccessfullyFinished(query.data)) {
    return query.data;
  }

  return 0;
}
