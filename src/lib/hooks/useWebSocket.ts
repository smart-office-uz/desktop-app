import { Centrifuge } from "centrifuge";
import { useEffect } from "react";

// services
import NotificationService from "@/core/services/notification.service";

// utils
import { useSessionStore } from "@/store/session";
import { updateAppIcon } from "../utils/update-tray-icon";

export const useWebSocket = (deps: {
  getUserStaffId: () => Promise<string>;
}) => {
  const { accessToken } = useSessionStore();
  const connect = async () => {
    if (accessToken === undefined || accessToken === "" || accessToken === null)
      return;
    const centrifuge = new Centrifuge(import.meta.env.CENTRIFUGE_PATH, {
      token: import.meta.env.CENTRIFUGE_TOKEN,
    });

    const notificationSubscriptionStaffId = await deps.getUserStaffId();
    const notificationSubscriptionPath = `smart-office-notification_${notificationSubscriptionStaffId}`;
    const notificationSubscription = centrifuge.newSubscription(
      notificationSubscriptionPath,
    );

    notificationSubscription.on("publication", async (ctx) => {
      const notificationData = ctx.data as {
        text: string;
        redirect?: string;
      };
      const notificationService = new NotificationService();
      const notifications =
        await notificationService.getLatestNotificationsCount();

      if (notifications === 0) return;

      await updateAppIcon(notifications);

      const redirectUrl = notificationData?.redirect
        ? notificationData.redirect
        : "https://smart-office.uz/tables/history_notification";

      // this is a workaround for handling the blocking of the main thread by notify-rust
      setTimeout(() => {
        notificationService.display(
          `Sizda ${notifications} ta yangi xabar bor!`,
          redirectUrl,
        );
      }, 2000);
    });

    notificationSubscription.subscribe();
    centrifuge.connect();
  };

  useEffect(() => {
    connect();
  }, []);

  // useEffect(() => {
  //   connect();
  // }, [accessToken]);

  return {};
};
