// widgets
import { AppLogo } from "./app-logo";
import { ModeToggle } from "./mode-toggle";
import { UserMenu } from "./user-menu";

export const Header = () => {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <AppLogo />
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
