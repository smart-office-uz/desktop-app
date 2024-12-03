import {
  ECertificate,
  type ECertificateEntity,
} from "./e-certificate.entity.js";
import EIMZO, { type Cert } from "./e-sign.config.js";
import "./e-sign.js";

export interface IESignService {
  initialize: (callbacks: {
    onSuccess: () => void;
    onError: (err: Error) => void;
  }) => Promise<void>;
  loadUserKeys: (callbacks: {
    onSuccess: (data: Array<ECertificateEntity<Cert>>) => void;
    onError: (err: Error) => Promise<void>;
  }) => Promise<void>;
  signCertificate: (
    certificate: ReturnType<ECertificateEntity<Cert>["getOriginal"]>,
    challenge: string,
  ) => Promise<string>;
}

class ESignService implements IESignService {
  private readonly instance = new EIMZO();

  constructor() {}

  async initialize({
    onError,
    onSuccess,
  }: Parameters<IESignService["initialize"]>["0"]) {
    try {
      await this.instance.install();
      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        onError(error);
      }
      if (error instanceof Event) {
        onError(new Error("E-IMZO ga ulanib bo'lmadi!"));
      }
    }
  }

  async loadUserKeys({
    onError,
    onSuccess,
  }: Parameters<IESignService["loadUserKeys"]>["0"]) {
    try {
      const certificates = (await this.instance.listAllUserKeys()).map(
        (certificate) => {
          const certificateEntity = new ECertificate({
            individual: {
              fullName: certificate.CN,
              pinfl: certificate.PINFL,
              tin: certificate.TIN,
            },
            original: certificate,
            serialNumber: certificate.serialNumber,
            validFrom: certificate.validFrom,
            validTo: certificate.validTo,
          });
          return certificateEntity;
        },
      );
      onSuccess(certificates);
    } catch (error) {
      if (error instanceof Error) {
        onError(error);
      }
    }
  }

  async signCertificate(
    certificate: ReturnType<ECertificateEntity<Cert>["getOriginal"]>,
    challenge: string,
  ): Promise<string> {
    const pkcs7String = await this.instance.signPkcs7(certificate, challenge);
    return pkcs7String.pkcs7_64;
  }
}

export default ESignService;
