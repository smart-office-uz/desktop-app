import { StoreDef } from "./store.def";

export default class AppStore implements StoreDef {
  constructor() {}

  get(key: string): string | null {
    const value = localStorage.getItem(key);
    return value;
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
