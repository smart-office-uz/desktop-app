import { useNavigate } from "@tanstack/react-router";

// components
import { Button } from "@/app/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";

// services
import NotificationService from "@/core/services/notification.service";
import SessionService, {
  ISessionService,
} from "@/core/services/session.service";

// use cases
import { logOutUseCase } from "@/core/use-cases/log-out/log-out";

// icons
import { User } from "lucide-react";

function doesUserSessionExist(sessionService: ISessionService): boolean {
  return (
    sessionService.getAccessToken() !== null &&
    sessionService.getAccessToken() !== undefined
  );
}

export function UserMenu() {
  const navigate = useNavigate();

  const sessionService = new SessionService();
  const notificationService = new NotificationService();

  async function handleLogout() {
    await logOutUseCase({
      sessionService,
      notificationService,
      redirectCallback() {
        navigate({
          to: "/sign-in",
        });
      },
    });
  }

  if (doesUserSessionExist(sessionService) === false) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-green-500"
        >
          <User className="h-5 w-5" />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Tizimdan chiqish
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
