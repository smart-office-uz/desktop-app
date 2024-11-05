import type { ComponentProps } from "react";

// helpers
import { cn } from "@/lib/utils/classnames";

interface AppLogoProps extends ComponentProps<"img"> {}

export const AppLogo = ({ className, ...props }: AppLogoProps) => {
  return (
    <img
      src="/smart-office-logo.png"
      alt="Logo"
      className={cn("h-8", className)}
      {...props}
    />
  );
};
