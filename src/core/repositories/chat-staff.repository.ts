import type { IChatOrganization } from "../entities/chat-organization.entity";
import type { IChatStaff } from "../entities/chat-staff.entity";
import TauriService from "../services/tauri.service";

export interface IChatStaffRepository {
  getByOrganizationId({}: {
    id: IChatOrganization["id"];
  }): Promise<IChatStaff[]>;
}

export class ChatStaffRepository implements IChatStaffRepository {
  private readonly tauriService = new TauriService();

  async getByOrganizationId({
    id,
  }: {
    id: IChatOrganization["id"];
  }): Promise<IChatStaff[]> {
    return [];
  }
}
