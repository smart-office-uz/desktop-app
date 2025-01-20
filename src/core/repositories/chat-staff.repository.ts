import type { IChatOrganization } from "../entities/chat-organization.entity";
import type { IChatStaff } from "../entities/chat-staff.entity";
import TauriService from "../services/tauri.service";

export interface IChatStaffRepository {
  getByOrganizationId({}: {
    id?: IChatOrganization["id"];
    token: string;
  }): Promise<IChatStaff[]>;
}

export class ChatStaffRepository implements IChatStaffRepository {
  private readonly tauriService = new TauriService();

  async getByOrganizationId({
    id,
    token,
  }: {
    id?: IChatOrganization["id"];
    token: string;
  }): Promise<IChatStaff[]> {
    const response = (await this.tauriService.invoke(
      "get_staffs_by_organization_id",
      {
        token,
        params: {
          organizationId: id,
        },
      }
    )) as string;

    const staffs = JSON.parse(response) as {
      data: {
        total: number;
        limit: number;
        page: number;
        staffs: Array<{
          id: string;
          org_id: number;
          pinfl: number;
          phone: string;
          name: string;
          short_name: string;
          label: string;
          department_name: string;
          position_name: string;
          org_name: string;
          avatar: `https://${string}/uploads/images/${string}`;
          status: "WORKER";
        }>;
      };
    };

    return staffs.data.staffs.map((data) => {
      const staff: IChatStaff = {
        departmentName: data.department_name,
        displayName: data.short_name,
        identifier: data.id,
        officialName: data.name,
        organization: {
          displayName: data.org_name,
          id: data.org_id,
          officialName: data.org_name,
        },
        phoneNumber: data.phone,
        pinfl: data.pinfl,
        positionName: data.position_name,
        profileImageLink: data.avatar,
      };

      return staff;
    });
  }
}
