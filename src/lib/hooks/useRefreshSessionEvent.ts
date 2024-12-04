import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

// tauri
import { listen } from "@tauri-apps/api/event";

// services
import type { INotificationService } from "@/core/services/notification.service";
import type { ISessionService } from "@/core/services/session.service";
import type { ITauriService } from "@/core/services/tauri.service";
import { refreshSessionUseCase } from "@/core/use-cases/refresh-session/refresh-session";

// helpers

export const useRefreshSessionEvent = (ctx: {
  notificationService: INotificationService;
  sessionService: ISessionService;
  tauriService: ITauriService;
}) => {
  const navigate = useNavigate();

  const { sessionService, tauriService } = ctx;

  useEffect(() => {
    listen("refresh_session", async () => {
      try {
        await refreshSessionUseCase({
          sessionService,
          tauriService,
        });
        navigate({
          to: "/",
        });
      } catch (error) {}
    });
  }, []);
};
