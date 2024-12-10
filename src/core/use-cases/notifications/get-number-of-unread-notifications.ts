import { useQuery } from "@tanstack/react-query";

// services
import NotificationService from "@/core/services/notification.service";

type ReturnType = number;
type Ctx = {
  onSuccess: (notificationsCount: number) => void;
};

export function useGetNumberOfUnreadNotifications(ctx: Ctx): ReturnType {
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
