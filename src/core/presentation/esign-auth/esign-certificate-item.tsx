import { ECertificateEntity } from "@/adapters/e-sign/e-certificate.entity";
import { Cert } from "@/adapters/e-sign/e-sign.config";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/card";
import { TypographyP } from "@/app/components/typography";

interface ESignCertificateItemCtx {
  certificate: ECertificateEntity<Cert>;
  authenticate: (
    certificate: ReturnType<ECertificateEntity<Cert>["getOriginal"]>
  ) => void;
}

export function ESignCertificateItem(ctx: ESignCertificateItemCtx) {
  const { certificate, authenticate } = ctx;

  return (
    <Card
      className="cursor-pointer hover:bg-secondary transition-colors"
      onClick={() => authenticate(certificate.getOriginal())}
    >
      <CardHeader>
        <TypographyP className="">
          JSHSHIR: {certificate.getIndividual().pinfl}
        </TypographyP>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg">
          {certificate.getIndividual().fullName}
        </CardTitle>
      </CardContent>
      <CardFooter className="dark:text-destructive font-semibold">
        Faolligi - {certificate.getValidity().to.toLocaleString()} gacha
      </CardFooter>
    </Card>
  );
}
