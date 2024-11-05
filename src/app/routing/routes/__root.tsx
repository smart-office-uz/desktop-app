import { createRootRoute, Outlet } from "@tanstack/react-router";

// widgets
import { Header } from "@/app/widgets/header";

// services
import UserService from "@/core/services/user.service";

// hooks
import { useLogoutEvent } from "@/lib/hooks/useLogoutEvent";
import { useWebSocket } from "@/lib/hooks/useWebSocket";

export const Route = createRootRoute({
  component: () => {
    const userService = new UserService();
    useWebSocket({
      getUserStaffId: userService.getUserStaffId,
    });
    useLogoutEvent();
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  },
});
