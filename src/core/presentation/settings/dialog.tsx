import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/dialog";
import { Settings } from "lucide-react";
import { useState } from "react";
import { SettingsForm } from "./form";

export function SettingsDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Settings />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sozlamalarni o'zgartirish</DialogTitle>
        </DialogHeader>
        <SettingsForm onUpdate={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
