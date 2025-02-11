import { useChatStore } from "@/store/chat/store";
import { Contact } from "lucide-react";

export function StaffDialogTrigger() {
  const { setIsStaffDialogOpen } = useChatStore();

  return (
    <button
      onClick={() => setIsStaffDialogOpen(true)}
      className="w-full flex px-3 py-2 font-bold items-center"
    >
      <Contact className="mr-2" />
      Kontaktlar
    </button>
  );
}
