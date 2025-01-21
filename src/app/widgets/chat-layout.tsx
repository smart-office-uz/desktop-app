import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { StaffDialog } from "@/core/presentation/chat/staff-dialog";
import { cn } from "@/lib/utils/classnames";
import { Menu, MessageCircle, Search, User2, Users } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function ChatLayout({ children }: LayoutProps) {
  return (
    <div className="h-[85vh] flex flex-col">
      {/* Title bar */}
      <div className="h-12 flex items-center justify-between px-4 border-b bg-background rounded-lg">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search" className="w-[200px] pl-8" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">{children}</div>

      {/* Bottom navigation */}
      <nav className="h-16 grid grid-cols-4 border-t bg-background rounded-lg">
        <NavItem icon={MessageCircle} label="Umumiy" />
        <NavItem icon={User2} label="Shaxsiy" />
        <NavItem icon={Users} label="Guruhlar" />
        <StaffDialog />
      </nav>
    </div>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
}

function NavItem({ icon: Icon, label }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-full rounded-none flex flex-col items-center justify-center gap-1"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs">{label}</span>
    </Button>
  );
}
