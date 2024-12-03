import { invoke as invokeTauri } from "@tauri-apps/api/core";

type TauriCommandArgs = {
  authenticate: {
    username: string;
    password: string;
  };
  refresh_token: {
    refreshToken: string;
  };
  notify: {
    message: string;
    redirect?: string;
  };
  read_notification: {
    token: string;
    id: string;
    index: number;
  };
  get_latest_notifications: {
    token: string;
  };
  get_latest_notifications_count: {
    token: string;
  };
  get_all_notifications: {
    token: string;
    page: number;
  };
  redirect: {
    url: string;
  };
  get_user_staff_id: {
    token: string;
  };
  change_window_size: {
    width: number;
    height: number;
  };
  center_window: {};
  update_tray_icon: {
    rgba: number[];
    width: number;
    height: number;
  };
};

type TauriCommand = keyof TauriCommandArgs;

export interface ITauriService {
  invoke: <T extends TauriCommand>(command: T, args: TauriCommandArgs[T]) => unknown;
}

export default class TauriService implements ITauriService {
  async invoke<T extends TauriCommand>(command: T, args: TauriCommandArgs[T]) {
    return await invokeTauri(command as string, {
      ...args,
    });
  }
}
