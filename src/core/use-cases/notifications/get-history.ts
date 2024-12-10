import { useQuery } from "@tanstack/react-query";

// services
import NotificationService from "@/core/services/notification.service";

// entities
import type { NotificationEntity } from "@/core/entities/notification.entity";

interface UseNotificationHistoryReturnType {
  notifications: NotificationEntity[];
  totalNotifications: number;
  totalPages: number;
  isLoadingNotificationHistory: boolean;
  refetchNotificationHistory: () => void;
}

interface UseNotificationCtx {
  pageSize: number;
  page: number;
}

export function useNotificationHistory(
  ctx: UseNotificationCtx
): UseNotificationHistoryReturnType {
  const { page = 0, pageSize = 10 } = ctx;

  const query = useQuery({
    queryKey: ["notification-history", ctx.page],
    queryFn: async () => {
      const notificationService = new NotificationService();
      const notifications = await notificationService.getAll(page);
      return notifications;
    },
    experimental_prefetchInRender: true,
    staleTime: 1000 * 60 * 5,
  });

  const totalNumberOfNotifications =
    query.data?.totalNumberOfNotifications ?? 0;
  const numberOfPages = Math.floor(totalNumberOfNotifications / pageSize);

  return {
    notifications: query.data?.notifications ?? [],
    isLoadingNotificationHistory: query.isFetching || query.isLoading,
    totalNotifications: totalNumberOfNotifications,
    totalPages: numberOfPages,
    refetchNotificationHistory: query.refetch,
  };
}
