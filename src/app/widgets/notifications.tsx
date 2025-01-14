// icons
import { Loader2 } from "lucide-react";

// services

// entities
import { NotificationEntity } from "@/core/entities/notification.entity";

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";

// tauri
import { markNotificationAsRead } from "@/core/use-cases/notifications/mask-as-read";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  notifications: NotificationEntity[];
  isLoading: boolean;
}

export function Notifications(props: Props) {
  const { notifications } = props;

  const queryClient = useQueryClient();

  async function handleNotificationClick(notification: {
    id: string;
    link: string;
    index: number;
  }) {
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

  if (props.isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <ul className="space-y-4 max-h-[50vh] overflow-y-auto cursor-pointer">
      {notifications.map((notification, index) => (
        <li
          key={notification.getId()}
          className="group flex items-center gap-6 bg-background rounded-2xl p-6 hover:bg-primary hover:text-foreground transition-colors"
          onClick={() =>
            handleNotificationClick({
              id: notification.getId(),
              link: notification.getLink(),
              index,
            })
          }
          tabIndex={0}
          onKeyUp={(evt) => {
            if (evt.key === "Enter") {
              handleRedirectOnEnter({
                link: notification.getLink(),
                id: notification.getId(),
                index,
              });
            }
          }}
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
      ))}
    </ul>
  );
}
