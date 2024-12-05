import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

// tauri
import { listen } from "@tauri-apps/api/event";

// services
import type { INotificationService } from "@/core/services/notification.service";
import type { ISessionService } from "@/core/services/session.service";
import type { ITauriService } from "@/core/services/tauri.service";

// use cases
import { logOutUseCase } from "@/core/use-cases/log-out/log-out";
import { refreshSessionUseCase } from "@/core/use-cases/refresh-session/refresh-session";

export const useRefreshSessionEvent = (ctx: {
  notificationService: INotificationService;
  sessionService: ISessionService;
  tauriService: ITauriService;
}) => {
  const navigate = useNavigate();

  const { sessionService, tauriService, notificationService } = ctx;

  useEffect(() => {
    listen("refresh_session", async () => {
      const response = await refreshSessionUseCase({
        sessionService,
        tauriService,
      });
      if (response instanceof Error) {
        logOutUseCase({
          sessionService,
          notificationService,
          redirectCallback: () => {
            navigate({
              to: "/sign-in",
            });
          },
        });
      } else {
        navigate({
          to: "/",
        });
      }
    });
  }, []);
};
