import { appInstanceService } from "@/core/services/app-instance.service";
import NotificationService from "@/core/services/notification.service";
import { useSessionStore } from "@/store/session";
import { Centrifuge } from "centrifuge";
import { useEffect } from "react";
import { toast } from "sonner";
import { updateAppIcon } from "../utils/update-tray-icon";

export function useOldWebSocket(deps: { getUserStaffId: () => Promise<string> }) {
  const { accessToken } = useSessionStore();

  async function connect() {
    if (!accessToken) return;

    const baseUrl = appInstanceService.getBaseUrl();
    if (!baseUrl) return;

    const centrifugeToken = appInstanceService.getNotificationToken();
    if (!centrifugeToken) return;

    const centrifugePath = `wss://${baseUrl.replace("https://", "")}/centrifugo/connection/websocket`;
    const centrifuge = new Centrifuge(centrifugePath, {
      token: centrifugeToken,
    });

    let notificationSubscriptionStaffId = await deps.getUserStaffId();
    const notificationSubscriptionPath = `smart-office-notification_${notificationSubscriptionStaffId}`;
    const notificationSubscription = centrifuge.newSubscription(
      notificationSubscriptionPath
    );

    notificationSubscription.on("publication", async (ctx) => {
      try {
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
          : `${baseUrl}/tables/history_notification`;

        // this is a workaround for handling the blocking of the main thread by notify-rust
        setTimeout(() => {
          notificationService.display(
            `Sizda ${notifications} ta yangi xabar bor!`,
            redirectUrl
          );
        }, 1000);
      } catch (err) {}
    });

    try {
      notificationSubscription.subscribe();
      centrifuge.connect();
    } catch (error) {
      toast.error("Centrifuge bilan ulanishda xatolik yuz berdi!");
    }
  }

  useEffect(() => {
    connect();
  }, []);

  return {};
}
