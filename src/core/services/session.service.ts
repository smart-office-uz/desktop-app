// store
import { useSessionStore } from "@/store/session";
import type { ITauriService } from "./tauri.service";

export interface ISessionService {
  createNew: (payload: { accessToken: string; refreshToken: string }) => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  refreshSession: (ctx: {
    tauriService: ITauriService;
  }) => Promise<boolean | Error>;
  clear: () => void;
}

export default class SessionService implements ISessionService {
  #storage = useSessionStore;

  createNew(payload: { accessToken: string; refreshToken: string }) {
    this.#storage.setState({
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    });
  }

  getAccessToken() {
    return this.#storage.getState().accessToken;
  }

  getRefreshToken() {
    return this.#storage.getState().refreshToken;
  }

  async refreshSession(ctx: { tauriService: ITauriService }) {
    const refreshToken = this.getRefreshToken();
    if (refreshToken === null) return new Error("Refresh token is not found!");

    const { tauriService } = ctx;
    const result = await tauriService.invoke("refresh_token", {
      refreshToken: refreshToken,
    });

    if (result.isErr()) return result.error;

    const data = result.value;

    this.createNew({
      accessToken: data.data.access_token,
      refreshToken: data.data.refresh_token,
    });

    return true;
  }

  clear() {
    this.#storage.setState({
      accessToken: undefined,
      refreshToken: undefined,
    });
  }
}
