import { Notification } from "../entities/notification.entity";
import NotificationRepository from "../repositories/notification.repository";
import TauriService from "./tauri.service";

export interface INotificationService {
  getLatest: () => Promise<Notification[]>;
  getLatestNotificationsCount: () => Promise<number>;
  getAll: (page: number) => Promise<{
    notifications: Notification[];
    totalNumberOfNotifications: number;
  }>;
  display: (message: string, redirect?: string) => void;
}

export default class NotificationService implements INotificationService {
  private readonly repository: NotificationRepository =
    new NotificationRepository();
  private readonly tauriService = new TauriService();

  async getLatest() {
    return await this.repository.getLatest();
  }

  async getLatestNotificationsCount() {
    return await this.repository.getLatestNotificationsCount();
  }

  async getAll(page: number = 1) {
    return await this.repository.getAll({ page });
  }

  display(message: string, redirect?: string) {
    const { invoke } = this.tauriService;
    if (!redirect) {
      invoke("notify", {
        message,
      });
      return;
    }
    invoke("notify", {
      message,
      redirect,
    });
  }
}
