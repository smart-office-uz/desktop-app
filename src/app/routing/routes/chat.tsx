import { ChatLayout } from "@/app/widgets/chat-layout";
import { Header } from "@/app/widgets/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  component: function () {
    return (
      <>
        <Header />
        <section>
          <div className="container mx-auto">
            <ChatLayout>
              <Outlet />
            </ChatLayout>
          </div>
        </section>
      </>
    );
  },
});
