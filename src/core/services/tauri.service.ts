import { invoke as invokeTauri } from "@tauri-apps/api/core";
import { err, ok, Result, ResultAsync } from "neverthrow";
import { crashReporter } from "./crash-reposter.service";

type TauriCommandArgs = {
  authenticate: {
    ctx: {
      username: string;
      password: string;
    };
    successResult: {
      access_token: string;
      refresh_token: string;
    };
  };
  refresh_token: {
    ctx: {
      refreshToken: string;
    };
    successResult: {
      data: {
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
        refresh_expires_in: number;
      };
      status: string;
      timestamp: number;
    };
  };
  notify: {
    ctx: {
      message: string;
      redirect?: string;
    };
    successResult: null;
  };
  read_notification: {
    ctx: {
      token: string;
      id: string;
      index: number;
    };
    successResult: null;
  };
  get_latest_notifications: {
    ctx: {
      token: string;
    };
    successResult: {
      data: {
        notify: {
          created_at: string;
          id: string;
          image_url: string;
          link: string;
          staff_id: string;
          title: string;
          type: string;
          fullname?: string;
        }[];
      };
    };
  };
  get_latest_notifications_count: {
    ctx: {
      token: string;
    };
    successResult: {
      data: {
        notify_count: {
          notify_count: number;
        };
      };
    };
  };
  get_all_notifications: {
    ctx: {
      token: string;
      page: number;
    };
    successResult: {
      data: {
        results: {
          date: string;
          id: string;
          link: string;
          status: "READ" | "SEND";
          task_text: string;
          full_name: string;
          staff_id: string;
        }[];
        total: number;
      };
    };
  };
  redirect: {
    ctx: {
      url: string;
    };
    successResult: {};
  };
  get_user_staff_id: {
    ctx: {
      token: string;
    };
    successResult: {
      staff_id: string;
    };
  };
  change_window_size: {
    ctx: {
      width: number;
      height: number;
    };
    successResult: {};
  };
  center_window: {
    ctx: null;
    successResult: {};
  };
  update_tray_icon: {
    ctx: {
      rgba: number[];
      width: number;
      height: number;
    };
    successResult: {};
  };
  get_org_list: {
    ctx: {
      token: string;
    };
    successResult: {
      organizations: {
        id: string;
        name: string;
        logo: string;
      }[];
    };
  };
  get_staffs_by_organization_id: {
    ctx: {
      token: string;
      params: {
        organization_id?: string;
        search?: string;
        page?: number;
      };
    };
    successResult: {
      staffs: {
        id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
        organization_id: string;
        organization_name: string;
        avatar: string;
      }[];
    };
  };
  get_chat_messages: {
    ctx: {
      token: string;
      params: {
        chat_id: string;
        last_read_message_update_id?: number;
      };
    };
    successResult: {
      messages: {
        id: string;
        sender_id: string;
        receiver_id: string;
        room_id: string;
        room_type: string;
        message: {
          text: string;
          file_id: string;
        };
        created_at: string;
        updated_at: string;
      }[];
    };
  };
  get_chats: {
    ctx: {
      token: string;
    };
    successResult: {
      chats: {
        id: string;
        sender_id: string;
        receiver_id: string;
        room_id: string;
        room_type: string;
        message: {
          text: string;
          file_id: string;
        };
        created_at: string;
        updated_at: string;
      }[];
    };
  };
  send_message: {
    ctx: {
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
    successResult: {};
  };
  start_new: {
    ctx: {
      token: string;
      params: {
        receiver_id: string;
      };
    };
    successResult: {
      room_id: string;
    };
  };
  get_store_value: {
    ctx: {
      key: string;
    };
    successResult: {
      value: string;
    };
  };
  set_store_value: {
    ctx: {
      key: string;
      value: string;
    };
    successResult: {};
  };
  clear_store: {
    ctx: null;
    successResult: null;
  };
  delete_store_value_by_key: {
    ctx: {
      key: string;
    };
    successResult: {};
  };
};

type TauriCommand = keyof TauriCommandArgs;

export interface ITauriService {
  invoke: <
    T extends TauriCommand,
    K extends TauriCommandArgs[T]["successResult"]
  >(
    command: T,
    args: TauriCommandArgs[T]["ctx"]
  ) => Promise<Result<K, Error>>;
}

export default class TauriService implements ITauriService {
  async invoke<
    T extends TauriCommand,
    K extends TauriCommandArgs[T]["successResult"]
  >(command: T, args: TauriCommandArgs[T]["ctx"]) {
    let fn = await ResultAsync.fromThrowable(
      async () =>
        invokeTauri(command as string, {
          ...args,
        }) as Promise<string>,
      () => new Error(`Failed to invoke ${command}`)
    )();

    if (fn.isErr()) {
      crashReporter.captureException(fn.error);
      return err(fn.error);
    }

    return ok(JSON.parse(fn.value) as K);
  }
}
