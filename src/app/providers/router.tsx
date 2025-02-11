import { routeTree } from "@/app/routing/routeTree.gen";
import { IChat } from "@/core/entities/chat.entity";

import {
  RouterProvider as TanstackRouterProvider,
  createRouter,
} from "@tanstack/react-router";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface HistoryState {
    chat?: IChat;
  }
}

export function RouterProvider() {
  return (
    <TanstackRouterProvider
      defaultErrorComponent={() => <div>Error</div>}
      router={router}
    />
  );
}
