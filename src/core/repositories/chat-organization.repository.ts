import type { IChatOrganization } from "../entities/chat-organization.entity";
import TauriService from "../services/tauri.service";

export interface IChatOrganizationRepository {
  getAll(ctx: { token: string }): Promise<IChatOrganization[]>;
}

export default class ChatOrganizationRepository
  implements IChatOrganizationRepository
{
  private readonly tauriService = new TauriService();

  async getAll(ctx: { token: string }): Promise<IChatOrganization[]> {
    const response = (await this.tauriService.invoke("get_org_list", {
      token: ctx.token,
    })) as string;

    const orgList = JSON.parse(response) as {
      data: {
        total: number;
        limit: number;
        orgs: Array<{
          id: number;
          name: string;
          label: string;
        }>;
        page: 1;
      };
    };

    return orgList.data.orgs.map((org) => {
      return {
        displayName: org.label,
        id: org.id,
        officialName: org.name,
      } satisfies IChatOrganization;
    });
  }
}
