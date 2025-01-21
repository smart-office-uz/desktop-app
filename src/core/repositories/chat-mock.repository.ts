import type { IChat } from "../entities/chat.entity";
import type { IChatRepository } from "./chat.repository";

export class ChatMockRepository implements IChatRepository {
  private chats: IChat[] = [
    {
      createdDate: new Date(),
      id: "some-id",
      lastMessage: {
        content: "Test",
        id: "some-another-id",
        sentDate: new Date(),
        type: "text",
      },
      name: {
        en: "Test",
        ru: "Test(ru)",
        uz: "Test(uz)",
      },
      type: "PRIVATE",
      owner: {
        id: "owner-id",
      },
    },
  ];

  async getAll(): Promise<IChat[]> {
    return this.chats;
  }
}
