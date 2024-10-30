// icons
import { Loader2 } from "lucide-react";

// components

// entities
import { Notification } from "@/core/entities/notification.entity";

// tauri
import { invoke } from "@tauri-apps/api/core";

export const Notifications = (props: {
  notifications: Notification[];
  isLoading: boolean;
}) => {
  const { notifications } = props;

  const redirect = (link: string) => {
    invoke("redirect", {
      url: link,
    });
  };

  if (props.isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <ul className="space-y-4 max-h-[500px] overflow-y-auto cursor-pointer">
      {notifications.map((notification) => (
        <li
          key={notification.id}
          className="flex items-center justify-between space-x-4  bg-foreground text-background rounded-md p-4"
          onClick={() => redirect(notification.link)}
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
