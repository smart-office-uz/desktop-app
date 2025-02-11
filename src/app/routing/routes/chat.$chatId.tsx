import { ChatRoom } from "@/core/presentation/chat/chat-room";
import { useGetChatWithMessages } from "@/core/use-cases/chat/get-chat-with-messages";
import { getCurrentUserStaffId } from "@/core/use-cases/current-user/get-staff-id";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/$chatId")({
  component: Page,
  loader: function () {
    const currentUserId = getCurrentUserStaffId();

    return {
      currentUserId,
    };
  },
});

function Page() {
  const { chatId } = Route.useParams();
  const { chat, messages, isFetching } = useGetChatWithMessages(chatId);
  const { currentUserId } = Route.useLoaderData();

  return (
    <section className="bg-background rounded-2xl h-full">
      <ChatRoom currentUserId={currentUserId} chat={chat} messages={messages} />
    </section>
  );
}
