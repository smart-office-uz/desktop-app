import { appInstanceService } from "@/core/services/app-instance.service";

export async function useCheckAppInstanceContext(): Promise<
  | {
      baseUrl: string;
      notificationServiceToken: string;
    }
  | Error
> {
  try {
    const baseUrl = await appInstanceService.getBaseUrl();
    const notificationServiceToken =
      await appInstanceService.getNotificationToken();

    if (!baseUrl) return new Error("Base URL is not set!");

    if (!notificationServiceToken)
      return new Error("Centrifuge token is not set!");

    return {
      baseUrl,
      notificationServiceToken,
    };
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error("Xatolik yuz berdi!");
  }
}
