import AppStore from "@/store/app/store";

export interface IAppInstanceService {
  // baseUrl
  getBaseUrl(): Promise<string | undefined>;
  setBaseUrl(value: string | null): Promise<void>;
  removeBaseUrl(): Promise<void>;

  // centrifugeToken
  getNotificationToken(): Promise<string | undefined>;
  setNotificationToken(token: string): Promise<void>;
  removeNotificationToken(): Promise<void>;
}

class AppInstanceService implements IAppInstanceService {
  private readonly appStore = new AppStore();

  async getBaseUrl() {
    return await this.appStore.get("baseUrl");
  }

  async setBaseUrl(value: string | null) {
    return await this.appStore.set("baseUrl", value!);
  }

  async removeBaseUrl() {
    return await this.appStore.delete("baseUrl");
  }

  async getNotificationToken() {
    return await this.appStore.get("notificationServiceToken");
  }

  async setNotificationToken(token: string) {
    await this.appStore.set("notificationServiceToken", token);
  }

  async removeNotificationToken() {
    return this.appStore.delete("notificationServiceToken");
  }
}

export const appInstanceService = new AppInstanceService();
