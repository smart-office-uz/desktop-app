import type { IChatOrganization } from "../entities/chat-organization.entity";

export interface IChatOrganizationRepository {
  getAll(): Promise<IChatOrganization[]>;
}

export class ChatOrganizationRepository implements IChatOrganizationRepository {
  async getAll(): Promise<IChatOrganization[]> {
    return [];
  }
}
