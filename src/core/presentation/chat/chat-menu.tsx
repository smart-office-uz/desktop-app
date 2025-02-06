import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import { StaffDialogTrigger } from "@/app/widgets/staff-dialog-trigger";
import { Menu } from "lucide-react";
import { CreateNewGroupTrigger } from "./create-new-group-trigger";

export function ChatMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <StaffDialogTrigger />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CreateNewGroupTrigger />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
