import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

// tauri
import { listen } from "@tauri-apps/api/event";

// services
import type { INotificationService } from "@/core/services/notification.service";
import type { ISessionService } from "@/core/services/session.service";

// helpers
import { logOutUseCase } from "@/core/use-cases/log-out/log-out";

export const useLogoutEvent = (ctx: {
  notificationService: INotificationService;
  sessionService: ISessionService;
}) => {
  const navigate = useNavigate();

  const { notificationService, sessionService } = ctx;

  useEffect(() => {
    listen("logout_user", async () => {
      await logOutUseCase({
        notificationService,
        sessionService,
        redirectCallback: () => {
          navigate({
            to: "/sign-in",
          });
        },
      });
    });
  }, []);
};
