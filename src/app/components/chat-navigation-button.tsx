import { cn } from "@/lib/utils/classnames";
import type { ElementType } from "react";
import { Button } from "./button";

interface Props {
  icon: ElementType;
  label: string;
  isActive?: boolean;
  handleClick?: () => void;
}

export function ChatNavigationButton({
  icon: Icon,
  label,
  isActive,
  handleClick,
}: Props) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-full rounded-none flex flex-col items-center justify-center gap-1",
        isActive && "bg-accent",
      )}
      onClick={handleClick}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs">{label}</span>
    </Button>
  );
}
