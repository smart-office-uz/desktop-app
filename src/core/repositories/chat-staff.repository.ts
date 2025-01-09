import type { IChatOrganization } from "../entities/chat-organization.entity";
import type { IChatStaff } from "../entities/chat-staff.entity";

export interface IChatStaffRepository {
  getByOrganizationId({}: {
    id: IChatOrganization["id"];
  }): Promise<IChatStaff[]>;
}

export class ChatStaffRepository implements IChatStaffRepository {
  async getByOrganizationId({
    id,
  }: {
    id: IChatOrganization["id"];
  }): Promise<IChatStaff[]> {
    return [];
  }
}
