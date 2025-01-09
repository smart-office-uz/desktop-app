import type { IChatOrganization } from "../entities/chat-organization.entity";
import { ChatOrganizationRepository } from "../repositories/chat-organization.repository";

export interface IChatOrganizationService {
  getAll(): Promise<IChatOrganization[]>;
}

export class ChatOrganizationService implements IChatOrganizationService {
  private readonly repository = new ChatOrganizationRepository();

  async getAll(): Promise<IChatOrganization[]> {
    return await this.repository.getAll();
  }
}
