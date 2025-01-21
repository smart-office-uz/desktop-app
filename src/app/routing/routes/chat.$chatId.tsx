import { ChatRoom } from "@/core/presentation/chat/chat-room";
import { getChatById } from "@/core/use-cases/chat/get-chat-by-id";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/$chatId")({
  component: Page,
  loader: async function ({ params }) {
    return await getChatById(params.chatId);
  },
});

function Page() {
  const chat = Route.useLoaderData();

  if (chat === undefined) return null;

  return (
    <section className="bg-background rounded-2xl h-full">
      <ChatRoom chat={chat} />
    </section>
  );
}
