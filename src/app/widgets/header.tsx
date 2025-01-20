import { SettingsDialog } from "@/core/presentation/settings/dialog";
import { AppLogo } from "./app-logo";
// import { LocaleSwitcher } from "./locale-switcher";
// import { MockSessionUpdater } from "./mock-session-updater";
import { ChatPageLink } from "./chat-page-link";
import { ModeToggle } from "./mode-toggle";
import { NotificationUpdateIndicator } from "./notification-update-indicator";
import { UserMenu } from "./user-menu";

export function Header() {
  return (
    <header>
      <div className="container mx-auto gap-4 py-6 flex justify-between">
        <div className="py-3 px-6 bg-background rounded-2xl">
          <AppLogo />
        </div>
        <div className="flex items-center justify-end gap-4 flex-grow py-3 px-6 bg-background rounded-2xl">
          <ModeToggle />
          {/* <MockSessionUpdater /> */}
          <NotificationUpdateIndicator />
          <ChatPageLink />
          {/* <div className="w-[2px] h-full bg-lightGray"></div> */}
          {/* <LocaleSwitcher /> */}
          <div className="w-[2px] h-full bg-lightGray"></div>
          <SettingsDialog />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
