import type { IChat, IChatMessage } from "../entities/chat.entity";
import TauriService from "../services/tauri.service";

export interface IChatRepository {
  getAll({}: { token: string }): Promise<IChat[]>;
  sendMessage({}: {
    chatId: IChat["id"];
    chatType: IChat["type"];
    token: string;
    message?: {
      file_id?: string;
      text?: string;
    };
  }): Promise<IChatMessage>;
  getChatMessages({}: { chat: IChat; token: string }): Promise<IChatMessage[]>;
  openNewChat({}: { receiverId: string }): Promise<IChat>;
}

export class ChatRepository implements IChatRepository {
  private readonly tauriService = new TauriService();

  async getAll({ token }: { token: string }): Promise<IChat[]> {
    const response = (await this.tauriService.invoke("get_chats", {
      token,
    })) as string;

    const data = JSON.parse(response) as {
      data: {
        total: number;
        profile: {
          name: string;
          phone: string;
          department_name: string;
          position_name: string;
          org_name: string;
          avatar: `https://${string}/uploads/images/${string}`;
        };
        chats: Array<{
          id: string;
          last_message?: string;
          last_message_file_ext?: string;
          last_sent_date?: string;
          last_message_id?: string;
          name: string;
          name_uz: string;
          name_la: string;
          avatar?: string;
          created_at: string;
          type: number;
          owner_id: string;
          status: "owner";
          last_read_message_update_id?: number;
          unread_count: number;
          receiver_id?: string;
        }>;
        online: string[];
      };
    };

    return data.data.chats.map((chat) => ({
      createdDate: new Date(chat.created_at),
      id: chat.id,
      lastMessage: {
        content: chat.last_message,
        id: chat.last_message_id,
        sentDate: chat.last_sent_date
          ? new Date(chat.last_sent_date)
          : undefined,
        updateId: chat.last_read_message_update_id,
      },
      name: {
        en: chat.name,
        ru: chat.name_la,
        uz: chat.name_uz,
      },
      type: chat.type === 1 ? "GROUP" : "PRIVATE",
      owner: {
        id: chat.owner_id,
      },
    }));
  }

  async sendMessage({
    chatId,
    chatType,
    message,
    token,
  }: {
    chatId: IChat["id"];
    chatType: IChat["type"];
    token: string;
    message?: {
      file_id?: string;
      text?: string;
    };
  }): Promise<IChatMessage> {
    const data = (await this.tauriService.invoke("send_message", {
      params: {
        room_id: chatId,
        room_type: chatType === "GROUP" ? "Group" : "Private",
        message: {
          file_id: message?.file_id,
          text: message?.text,
        },
      },
      token,
    })) as string;

    const newChatDto = JSON.parse(data) as {
      data: {
        id: string;
        text: string;
        state: number;
        created_at: string;
        sender_id: string;
        chat_id: string;
        receiver_id: string | null;
        sender_avatar: string | null;
        receiver_avatar: string | null;
        is_read: boolean;
        is_pinned: false;
        update_id: number;
      };
    };

    return {
      content: newChatDto.data.text,
      id: newChatDto.data.id,
      isRead: newChatDto.data.is_read,
      receiverUser: newChatDto.data.receiver_id
        ? {
            id: newChatDto.data.receiver_id,
            avatar: newChatDto.data.receiver_avatar,
          }
        : undefined,
      senderUser: {
        id: newChatDto.data.sender_id,
        avatar: newChatDto.data.sender_avatar ?? undefined,
      },
      sentDate: newChatDto.data.created_at
        ? new Date(newChatDto.data.created_at)
        : new Date(),
    };
  }

  async getChatMessages({
    chat,
    token,
  }: {
    chat: IChat;
    token: string;
  }): Promise<IChatMessage[]> {
    const data = (await this.tauriService.invoke("get_chat_messages", {
      params: {
        chat_id: chat.id,
        last_read_message_update_id: chat.lastMessage?.updateId,
      },
      token,
    })) as string;

    const parsed = JSON.parse(data) as {
      data: {
        total: number;
        limit: number;
        messages: Array<{
          id: string;
          updated_at?: string;
          text: string;
          created_at: string;
          read_at?: string;
          sender_id: string;
          chat_id?: string;
          reply_message_id?: string;
          receiver_id?: string;
          sender_avatar?: string;
          receiver_avatar?: string;
          is_read?: boolean;
          is_pinned: boolean;
          update_id: number;
          forward?: unknown;
          file?: unknown;
          reply?: {
            id: string;
            updated_at?: string;
            text: string;
            created_at: string;
            read_at?: string;
            sender_id: string;
            chat_id?: string;
            reply_message_id?: string;
            receiver_id?: string;
            sender_avatar?: string;
            receiver_avatar?: string;
            is_read?: boolean;
            is_pinned: boolean;
            update_id: number;
            forward?: unknown;
            file?: unknown;
            state?: number;
          };
          state?: number;
        }>;
      };
    };

    return parsed.data.messages.map((message) => ({
      content: message.text,
      id: message.id,
      isRead: message.is_read ? true : false,
      receiverUser: {
        avatar: message.receiver_avatar,
        id: message.receiver_id,
      },
      senderUser: {
        avatar: message.sender_avatar,
        id: message.sender_id,
      },
      sentDate: new Date(message.created_at),
      reply:
        message.reply !== null && message.reply !== undefined
          ? {
              content: message.reply.text,
              id: message.reply.id,
              isRead: message.reply.is_read ? true : false,
              receiverUser: {
                id: message.reply.receiver_id,
                avatar: message.reply.receiver_avatar,
              },
              senderUser: {
                id: message.reply.sender_id,
                avatar: message.reply.sender_avatar,
              },
              sentDate: new Date(message.created_at),
            }
          : undefined,
    }));
  }

  async openNewChat(ctx: {
    receiverId: string;
    token: string;
  }): Promise<IChat> {
    const { receiverId, token } = ctx;

    const response = (await this.tauriService.invoke("start_new", {
      params: {
        receiver_id: receiverId,
      },
      token,
    })) as string;

    const json = JSON.parse(response) as {
      data: {
        id: string;
        last_message?: unknown;
        last_sent_date?: string;
        last_message_id?: string;
        name: string;
        name_uz: string;
        name_la: string;
        avatar?: string;
        created_at?: string;
        type: number;
        owner_id: string;
        unread_count?: number;
        receiver_id: string;
      };
    };

    return {
      createdDate: json.data.created_at
        ? new Date(json.data.created_at)
        : new Date(),
      id: json.data.id,
      name: {
        en: json.data.name,
        ru: json.data.name_uz,
        uz: json.data.name_la,
      },
      type: json.data.type === 0 ? "PRIVATE" : "GROUP",
      owner: {
        id: json.data.owner_id,
      },
    };
  }
}
