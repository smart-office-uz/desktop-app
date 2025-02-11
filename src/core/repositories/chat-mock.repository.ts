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

  async getById(id: IChat["id"]): Promise<IChat | undefined> {
    return this.chats.find((chat) => chat.id === id);
  }

  async createNew(receiverId: string): Promise<IChat> {
    const newChat = {
      createdDate: new Date(),
      id: "new-" + receiverId,
      lastMessage: {
        content: "last",
        id: "last",
        sentDate: new Date(),
        type: "text",
      },
      name: {
        en: "inglish",
        ru: "russkiy",
        uz: "o'zbekcha",
      },
      type: "PRIVATE",
      owner: {
        id: receiverId,
      },
    } as IChat;

    this.chats.push(newChat);
    return newChat;
  }
}
