import type { IChat, IChatMessage } from "@/core/entities/chat.entity";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useRefreshChatContent(chat: IChat) {
  const queryClient = useQueryClient();
  const router = useRouter();

  function handleRefresh(newMessage: IChatMessage) {
    let chatMessages = queryClient.getQueryData([
      "getChatMessages",
      chat.id,
    ]) as IChatMessage[];

    chatMessages.push(newMessage);

    queryClient.invalidateQueries({
      queryKey: ["getChatList"],
    });
    queryClient.invalidateQueries({
      queryKey: ["getChatById", chat.id],
    });
    queryClient.setQueryData(["getChatMessages", chat.id], chatMessages);
    router.invalidate();
  }

  return handleRefresh;
}
