import { useSessionStore } from "@/store/session";
import type { IChatOrganization } from "../entities/chat-organization.entity";
import type { IChatStaff } from "../entities/chat-staff.entity";
import { ChatStaffRepository } from "../repositories/chat-staff.repository";

export interface IChatStaffService {
  getByOrganizationId({}: {
    id?: IChatOrganization["id"];
    page?: number;
  }): Promise<IChatStaff[]>;
}

export class ChatStaffService implements IChatStaffService {
  private readonly repository = new ChatStaffRepository();

  async getByOrganizationId({
    id,
    page,
  }: {
    id?: IChatOrganization["id"];
    page?: number;
  }): Promise<IChatStaff[]> {
    const accessToken = useSessionStore.getState().accessToken;
    if (!accessToken) return [];

    const staff = await this.repository.getByOrganizationId({
      id,
      page,
      token: accessToken,
    });

    return staff;
  }
}
