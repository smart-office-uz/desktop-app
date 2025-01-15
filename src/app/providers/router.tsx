import { routeTree } from "@/app/routing/routeTree.gen";

import {
  RouterProvider as TanstackRouterProvider,
  createRouter,
} from "@tanstack/react-router";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function RouterProvider() {
  return <TanstackRouterProvider router={router} />;
};
