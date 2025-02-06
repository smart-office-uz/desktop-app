import NotificationService from "@/core/services/notification.service";
import { updateAppIcon } from "@/lib/utils/update-tray-icon";
import type { PublicationContext } from "centrifuge";
import { displayNotificationUseCase } from "./display";

interface Ctx {
  baseUrl: string;
  ctx: PublicationContext;
}

export async function listenToNewNotificationsUseCase({ baseUrl, ctx }: Ctx) {
  const notificationData = ctx.data as {
    text: string;
    redirect?: string;
  };
  const notificationService = new NotificationService();
  const notifications = await notificationService.getLatestNotificationsCount();
  if (notifications === 0) return;

  await updateAppIcon(notifications);

  displayNotificationUseCase({
    content: `Sizda ${notifications} ta yangi xabar bor!`,
    baseUrl,
    redirectUrl: notificationData.redirect,
  });
}
