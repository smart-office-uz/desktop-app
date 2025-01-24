import type { IChat } from "@/core/entities/chat.entity";
import { useGetChatById } from "./get-chat-by-id";
import { useGetChatMessages } from "./get-chat-messages";

export function useGetChatWithMessages(chatId: IChat["id"]) {
  const { chat, isFetchingChatById } = useGetChatById(chatId);
  const { messages, isFetchingChatMessages } = useGetChatMessages(chat);

  return {
    chat,
    messages,
    isFetching: isFetchingChatById || isFetchingChatMessages,
  };
}
