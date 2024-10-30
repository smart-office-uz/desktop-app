import { createFileRoute, redirect } from "@tanstack/react-router";

// icons
import { RefreshCw } from "lucide-react";

// services
import NotificationService from "@/core/services/notification.service";
import UserService from "@/core/services/user.service";

// hooks
import { useQuery } from "@tanstack/react-query";

// widgets
import { Notifications } from "@/app/widgets/notifications";

// components
import { Button } from "@/app/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/card";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ location }) => {
    const userService = new UserService();

    if (!userService.checkIfAuthorized()) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: {
            href: location.href,
          },
        },
      });
    }
  },
  component: Index,
});

function Index() {
  const {
    data: notifications,
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const notificationService = new NotificationService();
      const notifications = await notificationService.getLatest();
      return notifications;
    },
  });

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl">Notifications</CardTitle>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh notifications</span>
          </Button>
        </CardHeader>
        <CardContent>
          <Notifications
            isLoading={isLoading || isFetching}
            notifications={notifications ?? []}
          />
        </CardContent>
      </Card>
    </div>
  );
}
