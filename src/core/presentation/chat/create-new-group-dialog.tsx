import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/dialog";
import { useChatStore } from "@/store/chat/store";
import { useShallow } from "zustand/shallow";
import { CreateNewGroup } from "./create-new-group";

export function CreateNewGroupDialog() {
  const { isOpen, setIsOpen } = useChatStore(
    useShallow((store) => ({
      isOpen: store.isCreateNewGroupDialogOpen,
      setIsOpen: store.setIsCreateNewGroupDialogOpen,
    }))
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yangi guruh yaratish</DialogTitle>
        </DialogHeader>
        <CreateNewGroup />
      </DialogContent>
    </Dialog>
  );
}
