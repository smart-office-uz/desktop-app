// services
import ESignService from "@/adapters/e-sign/e-sign.service";

// types
import {
  type ECertificate,
  ECertificateEntity,
} from "@/adapters/e-sign/e-certificate.entity";
import type { Cert } from "@/adapters/e-sign/e-sign.config";
import type { ESignAuthCtx } from "./context";

export const useESignAuth = (ctx: ESignAuthCtx) => {
  const eSignService = new ESignService();

  const { onSuccessFullyInitialized, onAuthenticated, onError } = ctx;

  async function handler() {
    await eSignService.init(
      () => {
        onSuccessFullyInitialized();
      },
      (error) => {
        onError(error);
      }
    );
  }

  async function loadCertificates(): Promise<ECertificateEntity<Cert>[]> {
    let certificates: Array<ECertificateEntity<Cert>> = [];
    await eSignService.loadUserKeys(
      (data) => {
        certificates = data;
      },
      () => {
        return [];
      }
    );
    return certificates;
  }

  async function authenticate(certificate: ECertificate<Cert>["original"]) {
    try {
      const challenge = await (await fetch("/api/eimzo/challenge", {})).json();
      console.log({ challenge });
      const challengeString = challenge.data.body.challenge;
      console.log({ challengeString });
      const signatureToken = await eSignService.signCertificate(
        certificate,
        challengeString
      );
      const eSignAuth = await (
        await fetch("/api/esign/authenticate", {
          method: "POST",
          body: signatureToken,
          headers: {
            "Device-Id": "Iphone X",
            "Content-Type": "text/plain",
          },
          
        })
      ).json();
      onAuthenticated({
        accessToken: eSignAuth.data.access_token,
        refreshToken: eSignAuth.data.refresh_token,
      });
    } catch (error) {
      if (error instanceof Error) {
        onError(error);
      } else {
        onError(new Error("E-IMZO ga ulanib bo'lmadi!"));
      }
    }
  }

  return {
    handler,
    loadCertificates,
    authenticate,
  };
};
