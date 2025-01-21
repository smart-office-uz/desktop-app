import { useChatStore } from "@/store/chat/store";
import { Menu } from "lucide-react";
import { Button } from "../components/button";

export function StaffDialogTrigger() {
  const { setIsStaffDialogOpen } = useChatStore();

  return (
    <Button
      onClick={() => setIsStaffDialogOpen(true)}
      variant="ghost"
      size="icon"
      className="h-8 w-8"
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
}
