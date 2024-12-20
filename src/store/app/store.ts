import { load, Store } from "@tauri-apps/plugin-store";
import { StoreDef } from "./store.def";

export default class AppStore implements StoreDef {
  private store: Store | undefined;

  constructor() {
    (async () => {
      const loadedStore = await load("store.json", { autoSave: false });
      this.store = loadedStore;
    })();
  }

  get(key: string): any | undefined {
    // const value = this.store?.get(key);
    const value = localStorage.getItem(key);
    return value;
  }

  set(key: string, value: any): void {
    // this.store?.set(key, value);
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    // this.store?.delete(key);
    localStorage.removeItem(key);
  }
}
