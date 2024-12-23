import { appInstanceService } from "@/core/services/app-instance.service";

interface Context {
  url: string;
}

export function useSetAppInstanceBaseUrl(ctx: Context) {
  const { url } = ctx;

  appInstanceService.setBaseUrl(url);

  return null;
}
