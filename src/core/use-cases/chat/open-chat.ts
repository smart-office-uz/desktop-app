import type { IChat } from "@/core/entities/chat.entity";
import { useNavigate } from "@tanstack/react-router";

export function useOpenChat() {
  const navigate = useNavigate();

  function handleOpenChat(chat: IChat) {
    navigate({
      to: "/chat/$chatId",
      params: {
        chatId: chat.id,
      },
    });
  }

  return {
    handleOpenChat,
  };
}
