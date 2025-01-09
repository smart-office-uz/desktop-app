import type { IChatOrganization } from "../entities/chat-organization.entity";
import type { IChatStaff } from "../entities/chat-staff.entity";
import { ChatStaffRepository } from "../repositories/chat-staff.repository";

export interface IChatStaffService {
  getByOrganizationId({}: {
    id: IChatOrganization["id"];
  }): Promise<IChatStaff[]>;
}

export class ChatStaffService implements IChatStaffService {
  private readonly repository = new ChatStaffRepository();

  async getByOrganizationId({
    id,
  }: {
    id: IChatOrganization["id"];
  }): Promise<IChatStaff[]> {
    const staff = await this.repository.getByOrganizationId({
      id,
    });

    return staff;
  }
}
