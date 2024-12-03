import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

// use-cases
import { useESignAuth } from "../../use-cases/esign-auth/use-esign-auth";

// adapters
import type { ECertificateEntity } from "@/adapters/e-sign/e-certificate.entity";
import type { Cert } from "@/adapters/e-sign/e-sign.config";

// components
import { Button, buttonVariants } from "@/app/components/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/dialog";
import { ESignCertificateList } from "./esign-certificate-list";

// services
import SessionService from "@/core/services/session.service";
import { initializeESignUseCase } from "@/core/use-cases/esign-initialize/use-initialize-esign";

export interface ESignAuthViewCtx {}

export const ESignAuthView = (_ctx: ESignAuthViewCtx) => {
  const navigate = useNavigate();

  const [isESignModalOpen, setESignModalOpen] = useState<boolean>(false);
  const [certificates, setSertificates] = useState<
    Array<ECertificateEntity<Cert>>
  >([]);

  async function handleESignAuthError(error: Error) {
    toast.error(error.message, {
      richColors: true,
      important: true,
      dismissible: true,
      className: "!bg-red-500 !text-white",
      closeButton: true,
    });
  }

  const initializeESignService = async () => {
    await initializeESignUseCase({
      onSuccess: async (service) => {
        await service.loadUserKeys({
          onSuccess: (certificates) => {
            setSertificates(certificates);
            setESignModalOpen(true);
          },
          onError: handleESignAuthError,
        });
      },
      onError: handleESignAuthError,
    });
  };
  const { authenticate } = useESignAuth({
    onError: handleESignAuthError,
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
        onClick={initializeESignService}
        variant="outline"
      >
        E-IMZO orqali kirish
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
