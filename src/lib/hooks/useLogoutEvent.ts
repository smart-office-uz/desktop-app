import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

// tauri
import { listen } from "@tauri-apps/api/event";

// services
import NotificationService from "@/core/services/notification.service";
import SessionService from "@/core/services/session.service";

export const useLogoutEvent = () => {
  const navigate = useNavigate();
  const sessionService = new SessionService();
  const notificationService = new NotificationService();

  useEffect(() => {
    listen("logout_user", () => {
      sessionService.clear();
      navigate({
        to: "/sign-in",
      });
      setTimeout(() => {
        notificationService.display(
          "Tokeningiz eskirdi, iltimos qaytadan tizimga kiring!",
        );
      }, 2000);
    });
  }, []);
};