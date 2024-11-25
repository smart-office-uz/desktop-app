import {
  ECertificate,
  type ECertificateEntity,
} from "./e-certificate.entity.js";
import EIMZO, { Cert } from "./e-sign.config.js";
import "./e-sign.js";

interface IESignService {
  init: (successs: () => void, fail: (err: Error) => void) => void;
  loadUserKeys: (
    success: (data: Array<ECertificateEntity<Cert>>) => void,
    fail: (err: Error) => void
  ) => void;
  signCertificate: (
    certificate: ReturnType<ECertificateEntity<Cert>["getOriginal"]>,
    challenge: string
  ) => void;
}

class ESignService implements IESignService {
  private readonly instance = new EIMZO();

  constructor() {}

  async init(
    success: Parameters<IESignService["init"]>["0"],
    fail: Parameters<IESignService["init"]>["1"]
  ) {
    try {
      await this.instance.install();
      success();
    } catch (error) {
      if (error instanceof Error) {
        fail(error);
      }
      if (error instanceof Event) {
        fail(new Error("E-IMZO ga ulanib bo'lmadi!"));
      }
    }
  }

  async loadUserKeys(
    success: Parameters<IESignService["loadUserKeys"]>["0"],
    fail: Parameters<IESignService["loadUserKeys"]>["1"]
  ) {
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
        }
      );
      success(certificates);
    } catch (error) {
      if (error instanceof Error) {
        fail(error);
      }
    }
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
