import AppStore from "@/store/app/store";

export interface IAppInstanceService {
  getBaseUrl(): string | null;
  setBaseUrl(value: string | undefined): void;
}

class AppInstanceService implements IAppInstanceService {
  private readonly appStore = new AppStore();

  getBaseUrl() {
    return this.appStore.get("baseUrl");
  }

  setBaseUrl(value: string) {
    this.appStore.set("baseUrl", value);
  }
}

export const appInstanceService = new AppInstanceService();
