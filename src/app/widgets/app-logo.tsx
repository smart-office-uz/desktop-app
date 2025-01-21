import { cn } from "@/lib/utils/classnames";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import SmartOfficeLogo from "../../../public/smart-office-frontend-logo.svg?react";

interface AppLogoProps extends ComponentProps<"svg"> {}

export function AppLogo({ className, ...props }: AppLogoProps) {
  return (
    <Link to="/">
      <SmartOfficeLogo
        width={150}
        height={50}
        className={cn("", className)}
        {...props}
      />
    </Link>
  );
}
