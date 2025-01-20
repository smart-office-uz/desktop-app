import { appInstanceService } from "@/core/services/app-instance.service";

interface Context {
  url: string;
  notificationServiceToken: string;
}

export function useSetAppInstanceContext(ctx: Context) {
  const { url, notificationServiceToken } = ctx;

  appInstanceService.setBaseUrl(url);
  appInstanceService.setNotificationToken(notificationServiceToken);

  return null;
}
