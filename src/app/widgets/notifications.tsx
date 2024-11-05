import { useQueryClient } from "@tanstack/react-query";

// icons
import { Loader2 } from "lucide-react";

// services
import SessionService from "@/core/services/session.service";

// entities
import { Notification } from "@/core/entities/notification.entity";

// tauri
import { invoke } from "@tauri-apps/api/core";

export const Notifications = (props: {
  notifications: Notification[];
  isLoading: boolean;
}) => {
  const sessionService = new SessionService();
  const queryClient = useQueryClient();
  const { notifications } = props;

  const redirect = (link: string, id: string, index: number) => {
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
  };

  if (props.isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <ul className="space-y-4 max-h-[350px] overflow-y-auto cursor-pointer">
      {notifications.map((notification, index) => (
        <li
          key={notification.id}
          className="flex items-center justify-between space-x-4  bg-foreground text-background rounded-md p-4"
          onClick={() => redirect(notification.link, notification.id, index)}
        >
          {/* <Avatar>
                <AvatarImage src={notification.avatar} alt="Avatar" />
                <AvatarFallback>{notification.title[0]}</AvatarFallback>
              </Avatar> */}
          <div className="text-lg hover:underline font-medium">
            {notification.title}
          </div>
          <div className="font-medium">{notification.date}</div>
        </li>
      ))}
    </ul>
  );
};
