import { appInstanceService } from "@/core/services/app-instance.service";

interface Context {
  url: string;
  notificationServiceToken: string;
}

export async function useSetAppInstanceContext(
  ctx: Context
): Promise<true | Error> {
  const { url, notificationServiceToken } = ctx;

  try {
    await appInstanceService.setBaseUrl(url);
    await appInstanceService.setNotificationToken(notificationServiceToken);
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error("Xatolik yuz berdi!");
  }

  return true;
}
