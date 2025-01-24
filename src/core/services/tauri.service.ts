import { invoke as invokeTauri } from "@tauri-apps/api/core";
import { appInstanceService } from "./app-instance.service";

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
  get_org_list: {
    token: string;
  };
  get_staffs_by_organization_id: {
    token: string;
    params: {
      organizationId?: number;
      search?: string;
      page?: number;
    };
  };
  get_chat_messages: {
    token: string;
    params: {
      chat_id: string;
      last_read_message_update_id?: number;
    };
  };
  get_chats: {
    token: string;
  };
  send_message: {
    token: string;
    params: {
      room_id: string;
      room_type: "Private" | "Group";
      message: {
        file_id?: string;
        text?: string;
      };
    };
  };
  start_new: {
    token: string;
    params: {
      receiver_id: string;
    };
  };
};

type TauriCommand = keyof TauriCommandArgs;

export interface ITauriService {
  invoke: <T extends TauriCommand>(
    command: T,
    args: TauriCommandArgs[T]
  ) => unknown;
}

export default class TauriService implements ITauriService {
  async invoke<T extends TauriCommand>(command: T, args: TauriCommandArgs[T]) {
    const baseUrl = await appInstanceService.getBaseUrl();
    if (baseUrl === undefined || baseUrl === null)
      throw new Error("BASE_URL doesn't exist!");
    return await invokeTauri(command as string, {
      ...args,
      baseUrl,
    });
  }
}
