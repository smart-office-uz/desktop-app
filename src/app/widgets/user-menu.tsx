import { useNavigate } from "@tanstack/react-router";

// components
import { Button } from "@/app/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";

// services
import SessionService from "@/core/services/session.service";

// helpers
import { updateAppIcon } from "@/lib/utils/update-tray-icon";

// icons
import { User } from "lucide-react";

export const UserMenu = () => {
  const navigate = useNavigate();
  const sessionService = new SessionService();

  const handleLogout = async () => {
    sessionService.clear();
    navigate({
      to: "/sign-in",
    });

    await updateAppIcon();
  };

  if (
    sessionService.getAccessToken() === null ||
    sessionService.getAccessToken() === undefined
  ) {
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
        <DropdownMenuLabel>Mening akkauntim</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Tizimdan chiqish
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
