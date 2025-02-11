// store
import { useSessionStore } from "@/store/session";

// services
import TauriService from "../services/tauri.service";

// entities
import { Notification } from "../entities/notification.entity";
import { appInstanceService } from "../services/app-instance.service";

export default class NotificationRepository {
  private readonly tauriService = new TauriService();

  async getLatest(): Promise<Notification[]> {
    const { accessToken } = useSessionStore.getState();
    const { invoke } = this.tauriService;

    const baseUrl = await appInstanceService.getBaseUrl();

    if (!accessToken) {
      console.error("Access token is null or undefined");
      return [];
    }

    const response = (await invoke("get_latest_notifications", {
      token: accessToken,
    })) as string;

    const notifications = JSON.parse(response) as {
      data: {
        notify: {
          created_at: string;
          id: string;
          image_url: string;
          link: string;
          staff_id: string;
          title: string;
          type: string;
          fullname?: string;
        }[];
      };
    };

    return notifications?.data?.notify?.map((notification) => {
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

  async getAll({ page = 1 }: { page: number }): Promise<{
    notifications: Notification[];
    totalNumberOfNotifications: number;
  }> {
    const { accessToken } = useSessionStore.getState();
    const { invoke } = this.tauriService;

    if (!accessToken) {
      console.error("Access token is null or undefined");
      return {
        notifications: [],
        totalNumberOfNotifications: 0,
      };
    }

    const response = (await invoke("get_all_notifications", {
      token: accessToken,
      page,
    })) as string;

    const notifications = JSON.parse(response) as {
      data: {
        results: {
          date: string;
          id: string;
          link: string;
          status: "READ" | "SEND";
          task_text: string;
          full_name: string;
          staff_id: string;
        }[];
        total: number;
      };
    };

    return {
      notifications: notifications?.data?.results?.map((notification) => {
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
      totalNumberOfNotifications: notifications?.data?.total,
    };
  }

  async getLatestNotificationsCount(): Promise<number> {
    const { accessToken } = useSessionStore.getState();
    const { invoke } = this.tauriService;
    if (
      accessToken === null ||
      accessToken === "" ||
      accessToken === undefined
    ) {
      console.error("Access token is null or undefined");
      return 0;
    }
    const response = (await invoke("get_latest_notifications_count", {
      token: accessToken,
    })) as string;

    const count = JSON.parse(response) as {
      data: {
        notify_count: {
          notify_count: number;
        };
      };
    };

    return count.data.notify_count.notify_count;
  }
}
