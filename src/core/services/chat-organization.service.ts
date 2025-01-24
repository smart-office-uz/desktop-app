import { useSessionStore } from "@/store/session";
import type { IChatOrganization } from "../entities/chat-organization.entity";
import ChatOrganizationRepository from "../repositories/chat-organization.repository";

export interface IChatOrganizationService {
  getAll(): Promise<IChatOrganization[]>;
}

export default class ChatOrganizationService
  implements IChatOrganizationService
{
  private readonly repository = new ChatOrganizationRepository();
  #storage = useSessionStore;

  constructor() {
  }

  async getAll(): Promise<IChatOrganization[]> {
    let token = useSessionStore.getState().accessToken;
    if (token === null) return [];
    return await this.repository.getAll({
      token,
    });
  }
}
