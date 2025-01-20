import AppStore from "@/store/app/store";

export interface IAppInstanceService {
  // baseUrl
  getBaseUrl(): string | null;
  setBaseUrl(value: string | null): void;
  removeBaseUrl(): void;

  // centrifugeToken
  getNotificationToken(): string | null;
  setNotificationToken(token: string): void;
  removeNotificationToken(): void;
}

class AppInstanceService implements IAppInstanceService {
  private readonly appStore = new AppStore();

  getBaseUrl() {
    return this.appStore.get("baseUrl");
  }

  setBaseUrl(value: string | null) {
    this.appStore.set("baseUrl", value);
  }

  removeBaseUrl(): void {
    this.appStore.remove("baseUrl");
  }

  getNotificationToken() {
    return this.appStore.get("notificationServiceToken");
  }

  setNotificationToken(token: string): void {
    return this.appStore.set("notificationServiceToken", token);
  }

  removeNotificationToken(): void {
    return this.appStore.remove("notificationServiceToken");
  }
}

export const appInstanceService = new AppInstanceService();
