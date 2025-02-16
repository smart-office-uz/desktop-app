// services
import TauriService from "../services/tauri.service";

class UserRepository {
  private readonly tauriService = new TauriService();

  async signIn(payload: { username: string; password: string }) {
    const { password, username } = payload;
    const { invoke } = this.tauriService;

    let response = await invoke("authenticate", {
      username,
      password,
    });

    if (response.isErr()) {
      return response.error;
    }

    let out = response.value;

    return {
      accessToken: out.access_token,
      refreshToken: out.refresh_token,
    };
  }
}

export default UserRepository;
