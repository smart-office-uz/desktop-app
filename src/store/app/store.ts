import TauriService from "@/core/services/tauri.service";
import type { StoreDef } from "./store.def";

export default class AppStore implements StoreDef {
  private readonly tauriService = new TauriService();

  constructor() {}

  async get(key: string): Promise<string | undefined> {
    const value = await this.tauriService.invoke("get_store_value", {
      key,
    });

    return value as string;
  }

  async set(key: string, value: string): Promise<void> {
    await this.tauriService.invoke("set_store_value", {
      key,
      value,
    });
  }

  async clear(): Promise<void> {
    await this.tauriService.invoke("clear_store", {});
  }

  async delete(key: string) {
    await this.tauriService.invoke("delete_store_value_by_key", {
      key,
    });
  }
}
