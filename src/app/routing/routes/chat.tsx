import { ChatLayout } from "@/app/widgets/chat-layout";
import { Header } from "@/app/widgets/header";
import { ChatSidebarList } from "@/core/presentation/chat/chat-sidebar-list";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  component() {
    return (
      <>
        <Header />
        <section>
          <div className="container mx-auto">
            <ChatLayout>
              <div className="flex w-full">
                <ChatSidebarList />
                <div className="flex-grow border-yellow-500">
                  <Outlet />
                </div>
              </div>
            </ChatLayout>
          </div>
        </section>
      </>
    );
  },
});
