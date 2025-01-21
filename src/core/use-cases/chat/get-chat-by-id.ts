import type { IChat } from "@/core/entities/chat.entity";
import { chatService } from "@/core/services/chat.service";

export async function getChatById(id: IChat["id"]) {
  const chat = await chatService.getById(id);

  return chat;
}
