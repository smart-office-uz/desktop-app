import { appInstanceService } from "@/core/services/app-instance.service";

export async function useCheckAppInstanceBaseUrl(): Promise<string | Error> {
  const baseUrl = await appInstanceService.getBaseUrl();

  if (!baseUrl) {
    return new Error("Base URL is not set");
  }
  return baseUrl;
}
