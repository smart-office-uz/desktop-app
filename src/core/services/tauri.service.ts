import { invoke as invokeTauri } from "@tauri-apps/api/core";

const TAURI_COMMANDS = [
  "authenticate",
  "notify",
  "get_latest_notifications",
  "get_latest_notifications_count",
  "get_all_notifications",
  "redirect",
  "update_tray_icon",
  "read_notification",
  "get_user_staff_id",
  "change_window_size",
  "center_window",
] as const;

type TauriCommand = (typeof TAURI_COMMANDS)[number];

interface ITauriService {
  invoke: (command: TauriCommand, args: object) => unknown;
}

export default class TauriService implements ITauriService {
  async invoke(command: TauriCommand, args: object) {
    return await invokeTauri(command, {
      ...args,
    });
  }
}
