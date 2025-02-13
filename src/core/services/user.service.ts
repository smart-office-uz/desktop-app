// repositories
import UserRepository from "../repositories/user.repository";

// services
import SessionService from "./session.service";
import TauriService from "./tauri.service";

class UserService {
  private readonly repository = new UserRepository();

  async signInUser(payload: { username: string; password: string }): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      return await this.repository.signIn(payload);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getUserStaffId(): Promise<string> {
    const tauriService = new TauriService();
    const sessionService = new SessionService();
    const { invoke } = tauriService;
    const accessToken = sessionService.getAccessToken();

    if (
      accessToken === null ||
      accessToken === "" ||
      accessToken === undefined
    ) {
      return "";
    }
    const response = (await invoke("get_user_staff_id", {
      token: accessToken,
    })) as string;

    const json = JSON.parse(response) as {
      data: {
        username: string;
        fullName: string;
        permissions: string[];
        updateId: number;
        locale: string;
        staffId: string | null;
        pinfl: number;
        tin: number | null;
        orgId: string | null;
        loggingLevel: "ON" | "OFF";
        id: string;
        postName: string | null;
        lastActivityPage: string | null;
        lastActivityAt: number | null;
        extraData: {
          org_id: number | null;
          parent_org_id: number | string | null;
          org_type: number;
          staff_id: string;
          post_name: string;
          type: string;
          region_id: number;
          district_id: number;
          pinfl: number;
          permissions: string[];
          ip_addresses: string | string[];
        };
      };
      status: string;
      timestamp: number;
    };

    return json.data.extraData.staff_id;
  }

  checkIfAuthorized(): boolean {
    const sessionService = new SessionService();
    const accessToken = sessionService.getAccessToken();
    return accessToken !== null && accessToken.length !== 0;
  }
}

export default UserService;
