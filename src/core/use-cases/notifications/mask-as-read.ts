import SessionService from "@/core/services/session.service";
import TauriService from "@/core/services/tauri.service";
import UserService from "@/core/services/user.service";

export async function markNotificationAsRead(ctx: {
  notification: {
    link: string;
    id: string;
    index: number;
  };
}): Promise<boolean | Error> {
  const { notification } = ctx;

  const tauriService = new TauriService();
  const sessionService = new SessionService();

  const accessToken = sessionService.getAccessToken();
  const userService = new UserService();

  if (userService.checkIfAuthorized() === false) {
    return new Error("You are not authorized!");
  }

  tauriService.invoke("read_notification", {
    id: notification.id,
    index: notification.index,
    token: accessToken!,
  });
  tauriService.invoke("redirect", {
    url: notification.link,
  });

  return true;
}
