import type { ComponentProps } from "react";

// helpers
import { cn } from "@/lib/utils/classnames";

// icons
import SmartOfficeLogo from "../../../public/smart-office-frontend-logo.svg?react";

interface AppLogoProps extends ComponentProps<"svg"> {}

export const AppLogo = ({ className, ...props }: AppLogoProps) => {
  return (
    // <img
    //   src="/smart-office-frontend-logo.svg"
    //   alt="Logo"
    //   className={cn("h-8", className)}
    //   {...props}
    // />
    <SmartOfficeLogo
      width={150}
      height={50}
      className={cn("", className)}
      {...props}
    />
  );
};
