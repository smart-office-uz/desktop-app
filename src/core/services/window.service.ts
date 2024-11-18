import TauriService from "./tauri.service";

class WindowService {
  private readonly tauriService = new TauriService();

  async change_window_size({
    height,
    width,
  }: {
    width: number;
    height: number;
  }) {
    const { invoke } = this.tauriService;
    invoke("change_window_size", { width, height });
  }

  async center_window() {
    const { invoke } = this.tauriService;
    await invoke("center_window", {});
  }
}

export default WindowService;
