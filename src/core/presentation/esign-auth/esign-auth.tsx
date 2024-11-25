import { toast } from "sonner";

// components
import { Button, buttonVariants } from "@/app/components/button";

// use-cases
import { ECertificateEntity } from "@/adapters/e-sign/e-certificate.entity";
import { Cert } from "@/adapters/e-sign/e-sign.config";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/dialog";
import SessionService from "@/core/services/session.service";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useESignAuth } from "../../use-cases/esign-auth/use-esign-auth";
import { ESignCertificateList } from "./esign-certificate-list";

export interface ESignAuthViewCtx {}

export const ESignAuthView = (_ctx: ESignAuthViewCtx) => {
  const navigate = useNavigate();
  const [isESignModalOpen, setESignModalOpen] = useState<boolean>(false);
  const [certificates, setSertificates] = useState<
    Array<ECertificateEntity<Cert>>
  >([]);
  const {
    handler: eSignAuthHandler,
    loadCertificates,
    authenticate,
  } = useESignAuth({
    onError(error) {
      toast.error(error.message, {
        richColors: true,
        important: true,
        dismissible: true,
        className: "!bg-red-500 !text-white",
        closeButton: true,
      });
    },
    async onSuccessFullyInitialized() {
      const certificates = await loadCertificates();
      setSertificates(certificates);
      setESignModalOpen(true);
    },
    onAuthenticated(data) {
      toast.success("E-IMZO orqali kirish muvaffaqqiyatli amalga oshirildi!");
      const sessionService = new SessionService();
      sessionService.createNew({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      navigate({
        to: "/",
      });
      // window.location.href = "/";

    },
  });

  return (
    <>
      <Button
        className="mt-6 invert w-full max-w-sm"
        onClick={eSignAuthHandler}
        variant="outline"
      >
        Continue with E-IMZO
      </Button>
      <Dialog open={isESignModalOpen} onOpenChange={setESignModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>E-IMZO orqali kiring</DialogTitle>
          </DialogHeader>
          <ESignCertificateList
            authenticate={authenticate}
            certificates={certificates}
          />

          <DialogFooter>
            <DialogClose className={buttonVariants({ variant: "destructive" })}>
              Bekor qilish
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
