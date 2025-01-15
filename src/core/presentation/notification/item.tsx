import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";
import { NotificationEntity } from "@/core/entities/notification.entity";
import { markNotificationAsRead } from "@/core/use-cases/notifications/mask-as-read";
import { useQueryClient } from "@tanstack/react-query";
import { KeyboardEvent } from "react";

interface NotificationItemProps {
  notification: NotificationEntity;
  index: number;
}

interface NotificationItemWithIndex {
  id: string;
  link: string;
  index: number;
}

export function NotificationItem(props: NotificationItemProps) {
  const { index, notification } = props;

  const queryClient = useQueryClient();

  async function handleNotificationClick(
    notification: NotificationItemWithIndex
  ) {
    await markNotificationAsRead({
      notification,
    });
    queryClient.invalidateQueries({
      queryKey: ["unread-notifications"],
    });
  }

  function handleRedirectOnEnter(
    redirectProps: Parameters<typeof handleNotificationClick>[0]
  ) {
    handleNotificationClick(redirectProps);
  }

  function handleClickEvent() {
    handleNotificationClick({
      index,
      id: notification.getId(),
      link: notification.getLink(),
    });
  }

  function handleKeyBoardEvent(evt: KeyboardEvent) {
    if (evt.key === "Enter") {
      handleRedirectOnEnter({
        link: notification.getLink(),
        id: notification.getId(),
        index,
      });
    }
  }

  return (
    <li
      className="group flex items-center gap-6 bg-background rounded-2xl p-6 hover:bg-primary hover:text-foreground transition-colors"
      tabIndex={0}
      key={notification.getId()}
      onClick={handleClickEvent}
      onKeyUp={handleKeyBoardEvent}
    >
      <div className="flex items-center gap-2">
        {notification.getStatus() === "SENT" && (
          <div className="w-2 h-2 rounded-full bg-destructive"></div>
        )}
        {notification.hasAvatarLink() ? (
          <Avatar aria-hidden="true">
            <AvatarImage
              width={48}
              height={48}
              className="object-cover rounded-full"
              src={notification.getAvatarLink()}
              alt={notification.getTitle()}
            />
            <AvatarFallback className="bg-transparent">
              <img src="/smart-office-logo.png" alt="Logo" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <img
            className="h-12 w-12 rounded-full"
            src="/smart-office-logo.png"
            alt="Logo"
          />
        )}
      </div>

      {notification.hasTaskOwnerName() ? (
        <div className="flex-grow flex flex-col gap-2">
          <div className="flex-grow flex text-darkGray font-semibold dark:text-white group-hover:text-white">
            {notification.getTitle()}
          </div>
          <p className="font-semibold text-primary group-hover:text-white">
            {notification.getTaskOwner().fullName}
          </p>
        </div>
      ) : (
        <div className="flex-grow flex gap-2 text-darkGray dark:text-white font-semibold text-lg group-hover:text-white">
          {notification.getTitle()}
        </div>
      )}
      <div className="space-y-4 flex flex-col items-end">
        <p className="font-medium text-darkGray dark:text-foreground group-hover:text-white">
          {notification.getDate()}
        </p>
      </div>
    </li>
  );
}
