import AppStore from "@/store/app/store";

export interface IAppInstanceService {
  getBaseUrl(): Promise<string | undefined>;
  setBaseUrl(value: string | undefined): void;
}

class AppInstanceService implements IAppInstanceService {
  private readonly appStore = new AppStore();

  async getBaseUrl() {
    return await this.appStore.get("baseUrl");
  }

  setBaseUrl(value: string) {
    this.appStore.set("baseUrl", value);
  }
}

export const appInstanceService = new AppInstanceService();
