import { Button } from "@/app/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import SessionService from "@/core/services/session.service";
import { useNavigate } from "@tanstack/react-router";
import { User } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const sessionService = new SessionService();
    sessionService.clear();
    navigate({
      to: "/sign-in",
    });
  };

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/smart-office-logo.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mening akkauntim</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Tizimdan chiqish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
