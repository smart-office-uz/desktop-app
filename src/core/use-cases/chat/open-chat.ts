import type { IChat } from "@/core/entities/chat.entity";
import { useNavigate } from "@tanstack/react-router";

export function useOpenChat() {
  const navigate = useNavigate();

  function handleOpenChat(chatId: IChat["id"]) {
    navigate({
      from: "/chat",
      to: "$chatId",
      params: {
        chatId,
      },
    });
  }

  return {
    handleOpenChat,
  };
}
