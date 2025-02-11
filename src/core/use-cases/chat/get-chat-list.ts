import { chatService } from "@/core/services/chat.service";
import { useQuery } from "@tanstack/react-query";

export function useGetChatList() {
  const query = useQuery({
    queryKey: ["getChatList"],
    queryFn: async function () {
      return await chatService.getAll();
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
