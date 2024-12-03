// store
import { useSessionStore } from "@/store/session";
import { ITauriService } from "./tauri.service";

export interface ISessionService {
  createNew: (payload: { accessToken: string; refreshToken: string }) => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  refreshSession: (ctx: { tauriService: ITauriService }) => Promise<void>;
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
    if (refreshToken === null) throw new Error("Refresh token is not found!");

    const { tauriService } = ctx;
    const response = (await tauriService.invoke("refresh_token", {
      refreshToken: refreshToken,
    })) as string;

    const data = JSON.parse(response) as {
      data: {
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
        refresh_expires_in: number;
      };
      status: string;
      timestamp: number;
    };
    this.createNew({
      accessToken: data.data.access_token,
      refreshToken: data.data.refresh_token,
    });
  }

  clear() {
    this.#storage.setState({
      accessToken: undefined,
      refreshToken: undefined,
    });
  }
}
