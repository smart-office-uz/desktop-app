import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

// tauri
import { listen } from "@tauri-apps/api/event";

// services
import type {
  INotificationService,
} from "@/core/services/notification.service";

// helpers
import { updateAppIcon } from "@/lib/utils/update-tray-icon";

export const useLogoutEvent = (ctx: {
  notificationService: INotificationService;
}) => {
  const navigate = useNavigate();

  const { notificationService } = ctx;

  useEffect(() => {
    listen("logout_user", async () => {
      navigate({
        to: "/sign-in",
      });

      await updateAppIcon();

      setTimeout(() => {
        notificationService.display(
          "Tokeningiz eskirdi, iltimos qaytadan tizimga kiring!"
        );
      }, 2000);
    });
  }, []);
};
