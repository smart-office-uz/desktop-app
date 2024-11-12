import { createFileRoute, redirect } from "@tanstack/react-router";

// icons

// services
import NotificationService from "@/core/services/notification.service";
import UserService from "@/core/services/user.service";

// hooks
import { useQuery } from "@tanstack/react-query";

// widgets
import { Header } from "@/app/widgets/header";

// components
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/tabs";
import { TypographyH2, TypographyP } from "@/app/components/typography";
import { Notifications } from "@/app/widgets/notifications";

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

  return (
    <>
      <Header />
      <section className="mt-10">
        <div className="container mx-auto">
          <TypographyH2>Xabarlar</TypographyH2>
          <TypographyP className="text-darkGray mb-6">
            Bu yerda sizga yuborilgan barcha xabarlarni ko’rishingiz mumkin.
          </TypographyP>
          <Tabs defaultValue="unread">
            <TabsList className="space-x-3 mb-4">
              <TabsTrigger value="unread" className="w-full">
                O'qilmagan xabarlar
              </TabsTrigger>
              <TabsTrigger value="all" className="w-full">
                Barcha xabarlar
              </TabsTrigger>
            </TabsList>
            <TabsContent value="unread">
              <Notifications
                isLoading={isLoading || isFetching}
                notifications={notifications ?? []}
              />
            </TabsContent>
            <TabsContent value="all"></TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
