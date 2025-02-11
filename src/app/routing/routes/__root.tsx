import { createRootRoute, Outlet } from "@tanstack/react-router";

// hooks
import { useLogoutEvent } from "@/lib/hooks/useLogoutEvent";
import { useRefreshSessionEvent } from "@/lib/hooks/useRefreshSessionEvent";

// services
import { ErrorFallBack } from "@/app/providers/error";
import { crashReporter } from "@/core/services/crash-reposter.service";
import NotificationService from "@/core/services/notification.service";
import SessionService from "@/core/services/session.service";
import TauriService from "@/core/services/tauri.service";
import { useWebSocket } from "@/lib/hooks/useWebSocket";

export const Route = createRootRoute({
  component: () => {
    const notificationService = new NotificationService();
    const tauriService = new TauriService();
    const sessionService = new SessionService();

    useWebSocket();
    useLogoutEvent({
      notificationService,
      sessionService,
    });
    useRefreshSessionEvent({
      notificationService,
      sessionService,
      tauriService,
    });
    return <Outlet />;
  },
  errorComponent({ error, reset }) {
    return <ErrorFallBack error={error} reset={reset} />;
  },
  onCatch(error) {
    crashReporter.captureException(error, {
      severityLevel: "error",
    });
  },
});
