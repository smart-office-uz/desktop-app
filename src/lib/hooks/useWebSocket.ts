import { appInstanceService } from "@/core/services/app-instance.service";
import { getCurrentUserStaffId } from "@/core/use-cases/current-user/get-staff-id";
import { listenToNewNotificationsUseCase } from "@/core/use-cases/notifications/listen-to-new-notifications";
import {
  Centrifuge,
  type PublicationContext,
  type SubscriptionEvents,
  type SubscriptionOptions,
} from "centrifuge";
import { useEffect } from "react";

type Listener<E extends keyof SubscriptionEvents> = {
  event: E;
  listener: SubscriptionEvents[E];
};

interface Ctx {
  baseUrl: string;
  token: string;
  subscriptions: {
    channelName: string;
    options: Partial<SubscriptionOptions>;
    listeners: Array<Listener<keyof SubscriptionEvents>>;
  }[];
}

function setupWebSocketConnection({ baseUrl, token, subscriptions }: Ctx) {
  const path = `wss://${baseUrl.replace(
    "https://",
    "",
  )}/centrifugo/connection/websocket`;

  const centrifuge = new Centrifuge(path, { token });

  subscriptions.forEach((subscription) => {
    const newSubscription = centrifuge.newSubscription(
      subscription.channelName,
    );

    subscription.listeners.forEach((listener) => {
      newSubscription.on(listener.event, async (ctx) => {
        try {
          listener.listener(ctx);
        } catch (error) {
          console.error("Error in event listener:", error);
        }
      });
    });

    newSubscription.subscribe();
  });

  centrifuge.connect();
}

interface UseWebSocketSubscriptionsCtx {
  accessToken: string;
  userStaffId: string;
  baseUrl: string;
}

function useConnectToWebSocketSubscription() {
  function connect(ctx: UseWebSocketSubscriptionsCtx) {
    const { accessToken, baseUrl, userStaffId } = ctx;

    const subscriptionsConfig: Ctx["subscriptions"] = [
      {
        channelName: `smart-office-notification_${userStaffId}`,
        options: {},
        listeners: [
          {
            event: "publication",
            async listener(ctx: PublicationContext) {
              listenToNewNotificationsUseCase({
                baseUrl,
                ctx,
              });
            },
          },
        ],
      },
      // {
      //   channelName: `smart-office-chat_${userStaffId}`,
      //   options: {},
      //   listeners: [
      //     {
      //       event: "publication",
      //       async listener(ctx: PublicationContext) {
      //         mutateAsync(ctx);
      //       },
      //     },
      //   ],
      // },
    ];

    setupWebSocketConnection({
      baseUrl,
      token: accessToken,
      subscriptions: [...subscriptionsConfig],
    });
  }

  return {
    connect,
  };
}

export function useWebSocket() {
  const { connect } = useConnectToWebSocketSubscription();

  async function handleConnect() {
    const accessToken = await appInstanceService.getNotificationToken();
    const baseUrl = await appInstanceService.getBaseUrl();

    if (!accessToken || !baseUrl) {
      return;
    }

    const staffId = await getCurrentUserStaffId();

    if (!staffId) {
      return;
    }

    connect({
      accessToken,
      baseUrl,
      userStaffId: staffId,
    });
  }

  useEffect(() => {
    handleConnect();
  }, []);

  return {};
}
