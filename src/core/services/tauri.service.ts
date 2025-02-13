import { invoke as invokeTauri } from "@tauri-apps/api/core";
import { crashReporter } from "./crash-reposter.service";

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
      organization_id?: string;
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
  get_store_value: {
    key: string;
  };
  set_store_value: {
    key: string;
    value: string;
  };
  clear_store: {};
  delete_store_value_by_key: {
    key: string;
  };
};

type TauriCommand = keyof TauriCommandArgs;

export interface ITauriService {
  invoke: <T extends TauriCommand>(
    command: T,
    args: TauriCommandArgs[T],
  ) => Promise<string | Error>;
}

export default class TauriService implements ITauriService {
  async invoke<T extends TauriCommand>(command: T, args: TauriCommandArgs[T]) {
    try {
      const result = (await invokeTauri(command as string, {
        ...args,
      })) as string;
      return result;
    } catch (error) {
      let failure;
      if (error instanceof Error) failure = error;
      else failure = new Error(`Failed to invoke ${command}: ${error}`);

      crashReporter.captureException(failure);

      return failure;
    }
  }
}
