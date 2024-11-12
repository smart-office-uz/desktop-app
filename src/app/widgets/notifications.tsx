import { useQueryClient } from "@tanstack/react-query";

// icons
import { Loader2 } from "lucide-react";

// services
import SessionService from "@/core/services/session.service";

// entities
import { Notification } from "@/core/entities/notification.entity";

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";

// tauri
import { invoke } from "@tauri-apps/api/core";

export const Notifications = (props: {
  notifications: Notification[];
  isLoading: boolean;
}) => {
  const sessionService = new SessionService();
  const queryClient = useQueryClient();
  const { notifications } = props;

  const redirect = ({
    link,
    id,
    index,
  }: {
    link: string;
    id: string;
    index: number;
  }) => {
    invoke("read_notification", {
      id,
      index,
      token: sessionService.getAccessToken(),
    });
    invoke("redirect", {
      url: link,
    });

    // invalidate the query cache for notifications
    // WARNING: this doesn't remove the existing data, it just marks it as stale so it can be refetched
    queryClient.invalidateQueries({
      queryKey: ["notifications"],
    });
    queryClient.invalidateQueries({
      queryKey: ["notification-count"],
    });
  };

  const handleRedirectOnEnter = (
    e: React.KeyboardEvent<HTMLLIElement>,
    redirectProps: Parameters<typeof redirect>[0],
  ) => {
    if (e.key === "Enter") {
      redirect(redirectProps);
    }
  };

  if (props.isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <ul className="space-y-4 max-h-[60vh] overflow-y-auto cursor-pointer">
      {notifications.map((notification, index) => (
        <li
          key={notification.id}
          className="flex items-center gap-6 bg-background rounded-2xl p-6"
          onClick={() =>
            redirect({
              id: notification.id,
              link: notification.link,
              index,
            })
          }
          tabIndex={0}
          onKeyUp={(evt) =>
            handleRedirectOnEnter(evt, {
              link: notification.link,
              id: notification.id,
              index,
            })
          }
        >
          {notification.avatarLink && (
            <Avatar aria-hidden="true">
              <AvatarImage
                width={48}
                height={48}
                className="object-cover rounded-full"
                src={notification.avatarLink}
                alt={notification.title}
              />
              <AvatarFallback className="bg-transparent">
                {/* <AppLogo className="h-4 w-4" /> */}
                <img src="/smart-office-logo.png" alt="Logo" />
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-grow flex gap-2 text-darkGray">
            {notification.title}
          </div>
          <div className="space-y-4 flex flex-col items-end">
            <p className="font-medium text-darkGray dark:text-foreground">
              {notification.date}
            </p>
            <button className="text-primary font-semibold">Batafsil</button>
          </div>
        </li>
      ))}
    </ul>
  );
};
