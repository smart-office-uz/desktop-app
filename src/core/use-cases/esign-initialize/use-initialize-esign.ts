import ESignService from "@/adapters/e-sign/e-sign.service";
import type { UseInitializeESignServiceContext } from "./context";

export async function initializeESignUseCase(
  ctx: UseInitializeESignServiceContext,
) {
  const eSignService = new ESignService();
  await eSignService.initialize({
    onSuccess: () => {
      ctx.onSuccess(eSignService);
    },
    onError: ctx.onError,
  });
}
