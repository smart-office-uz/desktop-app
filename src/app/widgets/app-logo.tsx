import { cn } from "@/lib/utils/classnames";
import type { ComponentProps } from "react";
import SmartOfficeLogo from "../../../public/smart-office-frontend-logo.svg?react";

interface AppLogoProps extends ComponentProps<"svg"> {}

export function AppLogo({ className, ...props }: AppLogoProps) {
  return (
    <SmartOfficeLogo
      width={150}
      height={50}
      className={cn("", className)}
      {...props}
    />
  );
}
