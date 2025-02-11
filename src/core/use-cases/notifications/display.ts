import NotificationService from "@/core/services/notification.service";

interface Ctx {
  content: string;
  redirectUrl?: string;
  baseUrl: string;
}

export async function displayNotificationUseCase({
  content,
  redirectUrl,
  baseUrl,
}: Ctx) {
  const redirectLink = redirectUrl ?? `${baseUrl}/tables/history_notification`;
  const notificationService = new NotificationService();

  // this is a workaround for handling the blocking of the main thread by notify-rust
  setTimeout(() => {
    notificationService.display(content, redirectLink);
  }, 1000);
}
