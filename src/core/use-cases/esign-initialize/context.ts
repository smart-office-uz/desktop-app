import type { IESignService } from "@/adapters/e-sign/e-sign.service";

export interface UseInitializeESignServiceContext {
  onSuccess: (service: IESignService) => void;
  onError: (error: Error) => void;
}
