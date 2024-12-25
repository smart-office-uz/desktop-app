import {
  ECertificate,
  type ECertificateEntity,
} from "./e-certificate.entity.js";
import EIMZO, { type Cert } from "./e-sign.config.js";
import "./e-sign.js";

export interface IESignService {
  initialize: () => Promise<Result<boolean, Error>>;

  loadUserKeys: () => Promise<Result<Array<ECertificateEntity<Cert>>, Error>>;

  signCertificate: (
    certificate: ReturnType<ECertificateEntity<Cert>["getOriginal"]>,
    challenge: string
  ) => Promise<string>;
}

class ESignService implements IESignService {
  private readonly instance = new EIMZO();

  constructor() {}

  async initialize(): Promise<
    Result<boolean, Error>
  > {
    try {
      await this.instance.install();
    } catch (error) {
      if (error instanceof Error) {
        return {
          ok: false,
          error,
        };
      }
      if (error instanceof Event) {
        return {
          ok: false,
          error: new Error("E-IMZO ga ulanib bo'lmadi!"),
        };
      }
    }

    return {
      ok: true,
      data: true,
    };
  }

  async loadUserKeys(): Promise<
    Result<Array<ECertificateEntity<Cert>>, Error>
  > {
    let out: Array<ECertificateEntity<Cert>> = [];

    try {
      out = (await this.instance.listAllUserKeys()).map((certificate) => {
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
      });
    } catch (error) {
      if (error instanceof Error) {
        return {
          ok: false,
          error,
        };
      }
    }

    return {
      ok: true,
      data: out,
    };
  }

  async signCertificate(
    certificate: ReturnType<ECertificateEntity<Cert>["getOriginal"]>,
    challenge: string
  ): Promise<string> {
    const pkcs7String = await this.instance.signPkcs7(certificate, challenge);
    return pkcs7String.pkcs7_64;
  }
}

export default ESignService;
