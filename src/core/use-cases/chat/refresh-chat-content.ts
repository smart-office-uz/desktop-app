import type { IChat, IChatMessage } from "@/core/entities/chat.entity";
import { useQueryClient } from "@tanstack/react-query";

export function useRefreshChatContent(chat: IChat) {
  const queryClient = useQueryClient();

  function handleRefresh(newMessage: IChatMessage) {
    let chatMessages = queryClient.getQueryData([
      "getChatMessages",
      chat.id,
    ]) as IChatMessage[];

    chatMessages.push(newMessage);

    queryClient.invalidateQueries({
      queryKey: ["getChatList"],
    });
    queryClient.setQueryData(["getChatMessages", chat.id], chatMessages);
  }

  return handleRefresh;
}
