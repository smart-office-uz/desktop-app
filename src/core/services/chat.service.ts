import type { IChat } from "../entities/chat.entity";
import { ChatRepository } from "../repositories/chat.repository";

export interface IChatService {
  getAll(): Promise<IChat[]>;
}

export class IChatService implements IChatService {
  private readonly repository = new ChatRepository();

  async getAll(): Promise<IChat[]> {
    const data = await this.repository.getAll();
    return data;
  }
}
