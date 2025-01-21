import type { IChat } from "../entities/chat.entity";

export interface IChatRepository {
  getAll(): Promise<IChat[]>;
  createNew(receiverId: string): Promise<IChat>;
  getById(id: IChat["id"]): Promise<IChat | undefined>;
}

export class ChatRepository implements IChatRepository {
  async getAll(): Promise<IChat[]> {
    return [];
  }

  async createNew(receiverId: string): Promise<IChat> {}
}
