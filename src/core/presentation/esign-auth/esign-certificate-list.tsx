import { ECertificateEntity } from "@/adapters/e-sign/e-certificate.entity";
import { Cert } from "@/adapters/e-sign/e-sign.config";
import { ESignCertificateItem } from "./esign-certificate-item";

interface ESignCertificateListCtx {
  certificates: ECertificateEntity<Cert>[];
  authenticate: (
    certificate: ReturnType<ECertificateEntity<Cert>["getOriginal"]>
  ) => void;
}

export const ESignCertificateList = (ctx: ESignCertificateListCtx) => {
  return (
    <ul className="grid gap-3 max-h-[500px] overflow-auto">
      {ctx.certificates.map((certificate) => (
        <li key={certificate.getSerialNumber()}>
          <ESignCertificateItem
            authenticate={ctx.authenticate}
            certificate={certificate}
          />
        </li>
      ))}
    </ul>
  );
};
