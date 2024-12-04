// services
import type { ISessionService } from "@/core/services/session.service";
import type { ITauriService } from "@/core/services/tauri.service";

export async function refreshSessionUseCase(deps: {
  sessionService: ISessionService;
  tauriService: ITauriService;
}) {
  const { sessionService, tauriService } = deps;
  await sessionService.refreshSession({
    tauriService,
  });
}
