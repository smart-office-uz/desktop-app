import type { IChat } from "../entities/chat.entity";
import { ChatMockRepository } from "../repositories/chat-mock.repository";

export interface IChatService {
  getAll(): Promise<IChat[]>;
  createNew({}: { receiverId: string }): Promise<IChat>;
  getById(id: IChat["id"]): Promise<IChat | undefined>;
}

export class ChatService implements IChatService {
  private readonly repository = new ChatMockRepository();

  async getAll(): Promise<IChat[]> {
    const data = await this.repository.getAll();
    return data;
  }

  async createNew({ receiverId }: { receiverId: string }): Promise<IChat> {
    return await this.repository.createNew(receiverId);
  }

  async getById(id: IChat["id"]): Promise<IChat | undefined> {
    return await this.repository.getById(id);
  }
}

export const chatService = new ChatService();
