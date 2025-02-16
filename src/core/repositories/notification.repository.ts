// store
import { useSessionStore } from "@/store/session";

// services
import TauriService from "../services/tauri.service";

// entities
import { Notification } from "../entities/notification.entity";
import { appInstanceService } from "../services/app-instance.service";
import { crashReporter } from "../services/crash-reposter.service";

export default class NotificationRepository {
  private readonly tauriService = new TauriService();

  async getLatest() {
    const { accessToken } = useSessionStore.getState();
    const { invoke } = this.tauriService;

    const baseUrl = await appInstanceService.getBaseUrl();

    if (!accessToken) {
      const error = new Error("No access token found");
      crashReporter.captureException(error);
      return error;
    }

    const result = await invoke("get_latest_notifications", {
      token: accessToken,
    });

    if (result.isErr()) {
      crashReporter.captureException(result.error);
      return result.error;
    }

    return result.value.data.notify.map((notification) => {
      return new Notification({
        id: notification.id,
        title: notification.title,
        link: notification.link,
        date: notification.created_at,
        avatarLink:
          baseUrl && notification.image_url
            ? baseUrl + notification.image_url
            : undefined,
        taskOwner: {
          staffId: notification.staff_id,
          fullName: "",
        },
        status: "SENT",
      });
    });
  }

  async getAll({ page = 1 }: { page: number }): Promise<
    | {
        notifications: Notification[];
        totalNumberOfNotifications: number;
      }
    | Error
  > {
    const { accessToken } = useSessionStore.getState();
    const { invoke } = this.tauriService;

    if (!accessToken) {
      const error = new Error("No access token found");
      crashReporter.captureException(error);
      throw error;
    }

    const result = await invoke("get_all_notifications", {
      token: accessToken,
      page,
    });

    if (result.isErr()) {
      crashReporter.captureException(result.error);
      return result.error;
    }

    return {
      notifications: result.value.data.results.map((notification) => {
        let notificationStatus: "READ" | "SENT" = "READ";

        if (notification.status === "SEND") {
          notificationStatus = "SENT";
        }

        return new Notification({
          id: notification.id,
          title: notification.task_text,
          link: notification.link,
          date: notification.date,
          taskOwner: {
            staffId: notification.id,
            fullName: notification.full_name,
          },
          status: notificationStatus,
        });
      }),
      totalNumberOfNotifications: result.value?.data?.total,
    };
  }

  async getLatestNotificationsCount() {
    const { accessToken } = useSessionStore.getState();
    const { invoke } = this.tauriService;

    if (!accessToken) {
      const error = new Error("No access token found");
      crashReporter.captureException(error);
      return error;
    }

    const result = await invoke("get_latest_notifications_count", {
      token: accessToken,
    });

    if (result.isErr()) {
      crashReporter.captureException(result.error);
      return result.error;
    }

    return result.value.data.notify_count.notify_count;
  }
}
