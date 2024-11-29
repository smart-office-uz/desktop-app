import { fetch } from "@tauri-apps/plugin-http";

// services
import ESignService from "@/adapters/e-sign/e-sign.service";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load();

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
    console.log("calling e-sign auth handler");
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
      const challenge = await (
        await fetch(
          "https://smart-office.uz/services/platon-auth/api/eimzo/challenge"
        )
      ).json();
      const challengeString = challenge.data.body.challenge;
      const signatureToken = await eSignService.signCertificate(
        certificate,
        challengeString
      );
      const fp = await fpPromise;
      const result = await fp.get();
      const eSignAuth = await (
        await fetch("https://smart-office.uz/services/platon-auth/api/eimzo", {
          method: "POST",
          body: signatureToken,
          headers: {
            "device-ip": "127.0.0.1",
            "device-id": "Iphone X",
            "device-fingerprint": result.visitorId,
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
