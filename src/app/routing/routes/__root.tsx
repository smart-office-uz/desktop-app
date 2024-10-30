import { Header } from "@/app/widgets/header";
import UserService from "@/core/services/user.service";
import { useWebSocket } from "@/lib/hooks/useWebSocket";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => {
    const userService = new UserService();
    useWebSocket({
      getUserStaffId: userService.getUserStaffId,
    });
    return (
      <>
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
