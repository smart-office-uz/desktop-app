import type { INotificationService } from "@/core/services/notification.service";
import type { ISessionService } from "@/core/services/session.service";

import { updateAppIcon } from "@/lib/utils/update-tray-icon";

interface LogOutUseCaseCtx {
  sessionService: ISessionService;
  notificationService: INotificationService;
  redirectCallback?: () => void;
}

export async function logOutUseCase(ctx: LogOutUseCaseCtx): Promise<void> {
  ctx.sessionService.clear();

  await updateAppIcon();

  ctx.redirectCallback?.();

  ctx.notificationService.display(
    "Siz tizimdan chiqdingiz, iltimos qaytadan tizimga kiring!"
  );
}
