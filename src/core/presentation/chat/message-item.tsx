import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";
import { IChatMessage } from "@/core/entities/chat.entity";
import { cn } from "@/lib/utils/classnames";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";

interface ChatMessageItemProps {
  message: IChatMessage;
  currentUserId: string;
}

export function ChatMessageItem({
  message,
  currentUserId,
}: ChatMessageItemProps) {
  const isSentByMe = message.senderUser.id === currentUserId;

  return (
    <div
      className={cn(
        "flex gap-2 max-w-[80%] group",
        isSentByMe ? "ml-auto flex-row-reverse" : ""
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage
        className="object-cover"
          src={
            isSentByMe
              ? message.senderUser.avatar
              : message.receiverUser?.avatar
          }
          alt={`${isSentByMe ? "Your" : "Their"} avatar`}
        />
        <AvatarFallback>{isSentByMe ? "ME" : "TH"}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        {message.reply && (
          <div
            className={cn(
              "rounded-lg p-2 text-sm opacity-80 max-w-[90%]",
              isSentByMe ? "bg-muted/50 ml-auto" : "bg-muted"
            )}
          >
            <p className="text-xs text-muted-foreground mb-1">
              Replying to{" "}
              {message.reply.senderUser.id === currentUserId
                ? "yourself"
                : "them"}
            </p>
            <p className="line-clamp-2">{message.reply.content}</p>
          </div>
        )}

        <div
          className={cn(
            "rounded-lg p-2 flex flex-col gap-1 relative group",
            isSentByMe ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          <p className="break-words">{message.content}</p>
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              isSentByMe
                ? "text-primary-foreground/80"
                : "text-muted-foreground"
            )}
          >
            <time dateTime={message.sentDate.toISOString()}>
              {format(message.sentDate, "HH:mm")}
            </time>
            {isSentByMe && (
              <div
                className="flex items-center"
                aria-label={message.isRead ? "Read" : "Delivered"}
              >
                {message.isRead ? (
                  <CheckCheck className="h-3 w-3" />
                ) : (
                  <Check className="h-3 w-3" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
