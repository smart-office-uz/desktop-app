import { invoke } from "@tauri-apps/api/core";

class WindowService {
  async change_window_size({
    height,
    width,
  }: {
    width: number;
    height: number;
  }) {
    invoke("change_window_size", { width, height });
  }

  async center_window() {
    await invoke("center_window");
  }
}

export default WindowService;
