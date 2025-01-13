import { Button } from "@/app/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/dialog";
import { cn } from "@/lib/utils/classnames";
import { Users } from "lucide-react";
import { useState } from "react";
import { OrganizationList } from "./OrganizationList";
import { StaffList } from "./StaffList";

export function StaffDialog() {
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-full rounded-none flex flex-col items-center justify-center gap-1",
            isOpen && "bg-accent",
          )}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs">Kontaktlar</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kontaktlar</DialogTitle>
        </DialogHeader>
        <OrganizationList />
        <StaffList />
      </DialogContent>
    </Dialog>
  );
}
