import type { Notification } from "@/core/entities/notification.entity";

export interface NotificationStoreDef {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  shouldRefetchNotifications: boolean;
  setShouldRefetchNotifications: (shouldRefetchNotifications: boolean) => void;
}
