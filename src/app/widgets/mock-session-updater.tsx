import { useNavigate } from "@tanstack/react-router";
import { RefreshCcw } from "lucide-react";
import { Button } from "../components/button";

// services
import NotificationService from "@/core/services/notification.service";
import SessionService from "@/core/services/session.service";
import TauriService from "@/core/services/tauri.service";

// use cases
import { logOutUseCase } from "@/core/use-cases/log-out/log-out";
import { refreshSessionUseCase } from "@/core/use-cases/refresh-session/refresh-session";

export const MockSessionUpdater = () => {
  const navigate = useNavigate();

  const sessionService = new SessionService();
  const tauriService = new TauriService();
  const notificationService = new NotificationService();

  const handleMockRefreshSession = async () => {
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
      window.location.pathname = "/";
    }
  };

  return (
    <Button
      onClick={handleMockRefreshSession}
      size="icon"
      className="rounded-full"
    >
      <RefreshCcw />
    </Button>
  );
};
