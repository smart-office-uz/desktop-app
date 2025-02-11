import type { IChat } from "@/core/entities/chat.entity";
import { chatService } from "@/core/services/chat.service";
import { useQuery } from "@tanstack/react-query";

export async function getChatById(id: IChat["id"]) {
  const chat = await chatService.getById(id);

  return chat;
}

export function useGetChatById(id: IChat["id"]) {
  const query = useQuery({
    queryKey: ["getChatById", id],
    queryFn: async () => await getChatById(id),
  });

  return {
    chat: query.data,
    isFetchingChatById: query.isFetching,
  };
}