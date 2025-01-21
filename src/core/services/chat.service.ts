import type { IChat } from "../entities/chat.entity";
import { ChatMockRepository } from "../repositories/chat-mock.repository";

export interface IChatService {
  getAll(): Promise<IChat[]>;
}

export class ChatService implements IChatService {
  private readonly repository = new ChatMockRepository();

  async getAll(): Promise<IChat[]> {
    const data = await this.repository.getAll();
    return data;
  }
}
