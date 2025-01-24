import { useSessionStore } from "@/store/session";
import { IChatStaff } from "../entities/chat-staff.entity";
import type { IChat, IChatMessage } from "../entities/chat.entity";
import { ChatRepository } from "../repositories/chat.repository";

export interface IChatService {
  getAll(): Promise<IChat[]>;
  sendMessage({}: {
    chat: IChat;
    file_id?: string;
    text?: string;
  }): Promise<IChatMessage | undefined>;
  getChatMessages(chat: IChat): Promise<IChatMessage[]>;
  getById(id: IChat["id"]): Promise<IChat | undefined>;
  openNewChatWithStaff(staff: IChatStaff): Promise<IChat | undefined>;
}

export class ChatService implements IChatService {
  private readonly repository = new ChatRepository();

  async getAll(): Promise<IChat[]> {
    const session = useSessionStore.getState();
    if (!session.accessToken) throw new Error("Unauthorized");

    const data = await this.repository.getAll({
      token: session.accessToken,
    });

    return data;
  }

  async getById(id: IChat["id"]): Promise<IChat | undefined> {
    const chats = await this.getAll();
    return chats.find((chat) => chat.id === id);
  }

  async sendMessage({
    chat,
    file_id,
    text,
  }: {
    chat: IChat;
    file_id?: string;
    text?: string;
  }): Promise<IChatMessage | undefined> {
    const session = useSessionStore.getState();
    if (!session.accessToken) return;

    return await this.repository.sendMessage({
      chatId: chat.id,
      chatType: chat.type,
      token: session.accessToken,
      message: {
        text,
        file_id,
      },
    });
  }

  async getChatMessages(chat: IChat): Promise<IChatMessage[]> {
    const session = useSessionStore.getState();
    if (!session.accessToken) throw new Error("Unauthorized");

    return await this.repository.getChatMessages({
      chat,
      token: session.accessToken,
    });
  }

  async openNewChatWithStaff(staff: IChatStaff): Promise<IChat | undefined> {
    const receiverId = staff.identifier;
    const token = useSessionStore.getState().accessToken;
    if (!token) return;

    return await this.repository.openNewChat({
      receiverId,
      token,
    });
  }
}

export const chatService = new ChatService();
