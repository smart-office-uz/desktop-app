import { useChatStore } from "@/store/chat/store";
import { PlusCircle } from "lucide-react";
import { useShallow } from "zustand/shallow";

export function CreateNewGroupTrigger() {
  const { setIsCreateNewGroupDialogOpen } = useChatStore(
    useShallow((store) => ({
      setIsCreateNewGroupDialogOpen: store.setIsCreateNewGroupDialogOpen,
    }))
  );

  return (
    <button
      onClick={() => setIsCreateNewGroupDialogOpen(true)}
      className="w-full flex px-3 py-2 font-bold items-center"
    >
      <PlusCircle className="mr-2" />
      Guruh yaratish
    </button>
  );
}
