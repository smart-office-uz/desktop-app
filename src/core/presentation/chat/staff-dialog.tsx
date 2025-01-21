import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/app/components/dialog";
import { useChatStore } from "@/store/chat/store";
import { StaffByOrganization } from "./staff-by-organization";

export function StaffDialog() {
  const { isStaffDialogOpen: isOpen, setIsStaffDialogOpen: setIsOpen } =
    useChatStore();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kontaktlar</DialogTitle>
        </DialogHeader>
        <StaffByOrganization />
      </DialogContent>
    </Dialog>
  );
}
