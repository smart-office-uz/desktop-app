import type { IChat } from "@/core/entities/chat.entity";
import { chatService } from "@/core/services/chat.service";
import { useQuery } from "@tanstack/react-query";

export async function getChatMessages(chat: IChat) {
  return await chatService.getChatMessages(chat);
}

export function useGetChatMessages(chat: IChat | undefined) {
  const query = useQuery({
    queryKey: ["getChatMessages", chat?.id],
    queryFn: async () => {
      if (chat) {
        return await getChatMessages(chat);
      }
    },
    enabled: chat?.id !== null && chat?.id !== undefined,
  });

  return {
    messages: query.data ?? [],
    isFetchingChatMessages: query.isFetching,
  };
}
