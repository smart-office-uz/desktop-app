import { ChatService } from "@/core/services/chat.service";
import { useQuery } from "@tanstack/react-query";

export function useGetChatList() {
  const query = useQuery({
    queryKey: ["getChatList"],
    queryFn: async function () {
      const service = new ChatService();
      return await service.getAll();
    },
  });

  return {
    chatList: query.data ?? [],
    isLoading: query.isLoading || query.isFetching,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
  };
}
