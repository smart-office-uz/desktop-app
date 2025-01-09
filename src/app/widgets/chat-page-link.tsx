import { Link, useLocation } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "../components/button";

export function ChatPageLink() {
  const { pathname } = useLocation();

  return (
    <Link
      className={buttonVariants({
        variant: "outline",
        size: "icon",
        className: "relative rounded-2xl",
      })}
      from={pathname}
      to="/chat"
    >
      <span className="sr-only">Chat</span>
      <MessageCircle className="h-6 w-6" />
    </Link>
  );
}
