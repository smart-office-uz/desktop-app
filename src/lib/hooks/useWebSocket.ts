import { Centrifuge } from "centrifuge";
import { useEffect } from "react";

// tauri
import { invoke } from "@tauri-apps/api/core";

// services
import NotificationService from "@/core/services/notification.service";
import { updateTrayIcon } from "../utils/update-tray-icon";

// types

export const useWebSocket = (deps: {
  getUserStaffId: () => Promise<string>;
}) => {
  const connect = async () => {
    const centrifugeConfig = JSON.parse(
      (await invoke("get_centrifuge_config")) as string,
    ) as {
      path: string;
      token: string;
    };
    // establish a connection
    const centrifuge = new Centrifuge(centrifugeConfig.path, {
      token: centrifugeConfig.token,
    });

    const notificationSubscriptionStaffId = await deps.getUserStaffId();
    const notificationSubscriptionPath = `smart-office-notification_${notificationSubscriptionStaffId}`;
    const notificationSubscription = centrifuge.newSubscription(
      notificationSubscriptionPath,
    );

    notificationSubscription.on("publication", async () => {
      const notificationService = new NotificationService();
      const notifications =
        await notificationService.getLatestNotificationsCount();

      if (notifications === 0) return;

      await updateTrayIcon(notifications);

      // this is a workaround for handling the blocking of the main thread by notify-rust
      setTimeout(() => {
        notificationService.display(
          `Sizda ${notifications} ta yangi xabar bor!`,
        );
      }, 3000);
    });

    notificationSubscription.subscribe();
    centrifuge.connect();
  };

  useEffect(() => {
    connect();
  }, []);

  return {};
};
