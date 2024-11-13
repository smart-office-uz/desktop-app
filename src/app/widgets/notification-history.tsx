import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// services
import NotificationService from "@/core/services/notification.service";

// widgets
import { Notifications } from "./notifications";

// components
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/button";

export const NotificationHistory = () => {
  const [page, setPage] = useState(1);
  const {
    data: notificationHistory,
    isFetching: isFetchingNotificationHistory,
    isLoading: isLoadingNotificationHistory,
  } = useQuery({
    queryKey: ["notification-history", page],
    queryFn: async () => {
      const notificationService = new NotificationService();
      const notifications = await notificationService.getAll(page);
      return notifications;
    },
  });

  return (
    <>
      <Notifications
        isLoading={
          isFetchingNotificationHistory || isLoadingNotificationHistory
        }
        notifications={notificationHistory?.notifications ?? []}
      />
      <div className="flex gap-6 items-center justify-between mt-8">
        <div className="flex gap-6 items-center">
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)}>
              <ChevronLeft />
              Oldingi
            </Button>
          )}
          <Button onClick={() => setPage(page + 1)}>
            Keyingi
            <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
};
