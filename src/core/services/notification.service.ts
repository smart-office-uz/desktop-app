import NotificationRepository from "../repositories/notification.repository";
import TauriService from "./tauri.service";

export default class NotificationService {
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
