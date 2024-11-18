// store
import { useSessionStore } from "@/store/session";

// services
import TauriService from "../services/tauri.service";

// entities
import { Notification } from "../entities/notification.entity";

export default class NotificationRepository {
  private readonly tauriService = new TauriService();

  async getLatest(): Promise<Notification[]> {
    const { accessToken } = useSessionStore.getState();
    const { invoke } = this.tauriService;

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

    return notifications?.data?.notify?.map((notification, index) => {
      return new Notification({
        id: notification.id,
        title: notification.title,
        link: notification.link,
        date: notification.created_at,
        avatarLink: notification.image_url,
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
        }[];
        total: number;
      };
    };

    return {
      notifications: notifications?.data?.results?.map(
        (notification, index) => {
          let notificationStatus: "READ" | "SENT" = "READ";
          if (notification.status === "SEND") {
            notificationStatus = "SENT";
          }
          return new Notification({
            id: notification.id,
            title: notification.task_text,
            link: notification.link,
            date: notification.date,
            avatarLink: "",
            taskOwner: {
              staffId: "",
              fullName: index % 2 === 0 ? "John Doe" : undefined,
            },
            status: notificationStatus,
          });
        }
      ),
      totalNumberOfNotifications: notifications?.data?.total,
    };
  }

  async getLatestNotificationsCount(): Promise<number> {
    const { accessToken } = useSessionStore.getState();
    const { invoke } = this.tauriService;

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
