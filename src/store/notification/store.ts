import { persist } from "zustand/middleware";
import { createWithEqualityFn as create } from "zustand/traditional";

// types
import type { Notification } from "@/core/entities/notification.entity";
import type { NotificationStoreDef } from "./store.def";

const useNotificationStore = create<NotificationStoreDef>()(
  persist<NotificationStoreDef>(
    (set) => ({
      notifications: [],
      setNotifications: (notifications: Notification[]) =>
        set({
          notifications,
        }),

      shouldRefetchNotifications: false,
      setShouldRefetchNotifications: (shouldRefetchNotifications: boolean) =>
        set({
          shouldRefetchNotifications,
        }),
    }),
    {
      name: "session",
    },
  ),
);

export default useNotificationStore;