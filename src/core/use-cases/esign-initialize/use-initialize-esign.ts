import ESignService, {
  type IESignService,
} from "@/adapters/e-sign/e-sign.service";

export async function initializeESignUseCase(): Promise<
  Result<IESignService, Error>
> {
  const eSignService = new ESignService();
  const response = await eSignService.initialize();

  if (response.ok === false) {
    return {
      ok: false,
      error: response.error,
    };
  }
  return {
    ok: true,
    data: eSignService,
  };
}
