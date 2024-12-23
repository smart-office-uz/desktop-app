import AppStore from "@/store/app/store";

export interface IAppInstanceService {
  getBaseUrl(): string | null;
  setBaseUrl(value: string | null): void;
  removeBaseUrl(): void;
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
}

export const appInstanceService = new AppInstanceService();
