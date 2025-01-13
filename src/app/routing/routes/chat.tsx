import { ChatLayout } from "@/app/widgets/chat-layout";
import { Header } from "@/app/widgets/header";
import { ChatRoom } from "@/core/presentation/chat/ChatRoom";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  component() {
    return (
      <>
        <Header />
        <section>
          <div className="container mx-auto">
            <ChatLayout>
              <ChatRoom />
            </ChatLayout>
          </div>
        </section>
      </>
    );
  },
});
