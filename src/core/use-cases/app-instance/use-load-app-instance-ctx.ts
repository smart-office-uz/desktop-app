import { appInstanceService } from "@/core/services/app-instance.service";
import { useEffect, useState } from "react";

export function useLoadAppInstanceContext() {
  const [ctx, setCtx] = useState<
    | {
        baseUrl: string;
        centrifugeToken: string;
      }
    | undefined
  >(undefined);

  async function load() {
    const baseUrl = await appInstanceService.getBaseUrl();
    const centrifugeToken = await appInstanceService.getNotificationToken();

    if (!baseUrl || !centrifugeToken) return;

    setCtx({
      baseUrl,
      centrifugeToken,
    });
  }

  useEffect(() => {
    load();
  }, []);

  return ctx;
}
