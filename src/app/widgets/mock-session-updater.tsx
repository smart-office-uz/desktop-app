import { RefreshCcw } from "lucide-react";
import { Button } from "../components/button";

// services
import SessionService from "@/core/services/session.service";
import TauriService from "@/core/services/tauri.service";

// use cases
import { refreshSessionUseCase } from "@/core/use-cases/refresh-session/refresh-session";

export const MockSessionUpdater = () => {
  const sessionService = new SessionService();
  const tauriService = new TauriService();

  const handleMockRefreshSession = async () => {
    const response = await refreshSessionUseCase({
      sessionService,
      tauriService,
    });
    console.log("response", response);
  };

  return (
    <Button
      onClick={handleMockRefreshSession}
      size="icon"
      className="rounded-full"
    >
      <RefreshCcw />
    </Button>
  );
};
