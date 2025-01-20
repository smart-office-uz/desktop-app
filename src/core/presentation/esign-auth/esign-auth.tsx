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

// use cases
import { initializeESignUseCase } from "@/core/use-cases/esign-initialize/use-initialize-esign";

// services
import SessionService from "@/core/services/session.service";

const ESIGN_AUTH_PENDING_TOAST_ID = "eSignAuthPendingToast";

function showESignAuthPendingToast() {
  toast.loading("Amalga oshirilmoqda...", {
    id: ESIGN_AUTH_PENDING_TOAST_ID,
  });
}

function removeESignAuthPendingToast() {
  toast.dismiss(ESIGN_AUTH_PENDING_TOAST_ID);
}

function showESignAuthError(error: Error) {
  toast.error(error.message, {
    richColors: true,
    important: true,
    dismissible: true,
    className: "!bg-red-500 !text-white",
    closeButton: true,
  });
}

export interface ESignAuthViewCtx {}

export function ESignAuthView(_ctx: ESignAuthViewCtx) {
  const navigate = useNavigate();

  const [isESignModalOpen, setESignModalOpen] = useState(false);
  const [certificates, setSertificates] = useState<
    Array<ECertificateEntity<Cert>>
  >([]);

  const initializeESignService = async () => {
    showESignAuthPendingToast();

    const initializeResponse = await initializeESignUseCase();
    if (initializeResponse.ok === false) {
      showESignAuthError(initializeResponse.error);
      return;
    }

    const response = await initializeResponse.data.loadUserKeys();
    if (response.ok === false) {
      showESignAuthError(response.error);
      return;
    }

    setSertificates(response.data);
    setESignModalOpen(true);
    removeESignAuthPendingToast();
  };

  const { authenticate } = useESignAuth({
    onError(error) {
      removeESignAuthPendingToast();
      showESignAuthError(error);
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
      removeESignAuthPendingToast();
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
            authenticate={function (certificate) {
              showESignAuthPendingToast();
              authenticate(certificate);
            }}
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
}
