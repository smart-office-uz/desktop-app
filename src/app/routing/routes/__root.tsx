import { createRootRoute, Outlet } from "@tanstack/react-router";

// hooks
import { useLogoutEvent } from "@/lib/hooks/useLogoutEvent";
import { useRefreshSessionEvent } from "@/lib/hooks/useRefreshSessionEvent";
import { useWebSocket } from "@/lib/hooks/useWebSocket";

// services
import NotificationService from "@/core/services/notification.service";
import SessionService from "@/core/services/session.service";
import TauriService from "@/core/services/tauri.service";
import UserService from "@/core/services/user.service";

export const Route = createRootRoute({
  component: () => {
    const notificationService = new NotificationService();
    const userService = new UserService();
    const tauriService = new TauriService();
    const sessionService = new SessionService();

    useWebSocket({
      getUserStaffId: userService.getUserStaffId,
    });
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
});
