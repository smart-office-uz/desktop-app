import * as Sentry from "@sentry/react";
import { createFileRoute, redirect } from "@tanstack/react-router";

// services
import UserService from "@/core/services/user.service";

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
import { NotificationHistory } from "@/app/widgets/notification-history";
import { UnReadNotifications } from "@/app/widgets/unread-notifications";

// use-cases
import { Button } from "@/app/components/button";
import { useCheckAppInstanceContext } from "@/core/use-cases/app-instance/use-check-app-instance-base-url";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ location }) => {
    const appInstanceContext = useCheckAppInstanceContext();
    if (appInstanceContext instanceof Error) {
      throw redirect({
        to: "/register-instance",
      });
    }

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
  return (
    <>
      <Header />
      <section className="mt-10">
        <div className="container mx-auto">
          <TypographyH2>Xabarlar</TypographyH2>
          <Button
            onClick={() => {
              Sentry.captureException(new Error("custom exception"));
            }}
          >
            Test capture error
          </Button>
          <TypographyP className="text-darkGray dark:text-white mb-6">
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
              <UnReadNotifications />
            </TabsContent>
            <TabsContent value="all">
              <NotificationHistory />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
