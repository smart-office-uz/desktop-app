import type { IChat } from "../entities/chat.entity";

export interface IChatRepository {
  getAll(): Promise<IChat[]>;
}

export class ChatRepository implements IChatRepository {
  async getAll(): Promise<IChat[]> {
    return [];
  }
}
