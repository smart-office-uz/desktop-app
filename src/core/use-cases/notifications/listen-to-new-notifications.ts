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
    text?: string;
    link?: string;
    host_name?: string;
  };
  const notificationService = new NotificationService();
  const notifications = await notificationService.getLatestNotificationsCount();
  if (notifications === 0) return;

  await updateAppIcon(notifications);

  let redirectUrl = "";

  if (notificationData?.link && notificationData?.host_name) {
    redirectUrl = `${notificationData.host_name}/${notificationData.link}`;
  } else {
    if (
      notificationData?.link &&
      notificationData.link.startsWith("https://")
    ) {
      redirectUrl = notificationData.link;
    } else {
      redirectUrl = `${baseUrl}/${notificationData.link}`;
    }
  }

  console.log({
    redirectUrl,
  });

  displayNotificationUseCase({
    content:
      notificationData?.text ?? `Sizda ${notifications} ta yangi xabar bor!`,
    baseUrl,
    redirectUrl,
  });
}
