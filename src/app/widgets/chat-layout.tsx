import { Input } from "@/app/components/input";
import { ChatMenu } from "@/core/presentation/chat/chat-menu";
import { ChatSidebarList } from "@/core/presentation/chat/chat-sidebar-list";
import { CreateNewGroupDialog } from "@/core/presentation/chat/create-new-group-dialog";
import { StaffDialog } from "@/core/presentation/chat/staff-dialog";
import { Search } from "lucide-react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function ChatLayout({ children }: LayoutProps) {
  return (
    <div className="flex gap-3">
      <section className="h-[80vh] bg-background border-b rounded-2xl w-chatSidebar">
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-2">
            <ChatMenu />
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8 rounded-full" />
            </div>
          </div>
        </div>

        <ChatSidebarList />
        <StaffDialog />
        <CreateNewGroupDialog />
      </section>
      <section className="flex-1 min-h-full">{children}</section>
    </div>
  );
}
