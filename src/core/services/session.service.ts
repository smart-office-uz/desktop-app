// store
import { useSessionStore } from "@/store/session";

export default class SessionService {
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

  clear() {
    this.#storage.setState({
      accessToken: undefined,
      refreshToken: undefined,
    });
  }
}
