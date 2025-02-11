import type { IChatMessage } from "@/core/entities/chat.entity";
import { chatService } from "@/core/services/chat.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PublicationContext } from "centrifuge";
import { useOpenChat } from "../chat/open-chat";

export function useListenToNewChatMessages() {
  const queryClient = useQueryClient();
  const { handleOpenChat } = useOpenChat();

  return useMutation({
    mutationFn: async function (ctx: PublicationContext) {
      if (ctx.data.action === "action.user.online") return;

      const data = ctx.data as {
        action: "chat.message.new";
        body: {
          chat_id: string;
          created_at: string;
          file?: unknown;
          forward?: unknown;
          id: string;
          is_pinned?: string;
          is_read?: string;
          receiver_avatar?: string;
          receiver_id: string;
          reply?: unknown;
          reply_message_id?: string;
          sender_avatar?: string;
          sender_id: string;
          state: string;
          text: string;
          update_id: string;
          updated_at: string | null;
        };
      };

      const cachedMessages = queryClient.getQueryData([
        "getChatMessages",
        data.body.chat_id,
      ]) as IChatMessage[];

      const newMessage: IChatMessage = {
        content: data.body.text,
        id: data.body.id,
        receiverUser: {
          avatar: data.body.receiver_avatar,
          id: data.body.receiver_id,
        },
        senderUser: {
          id: data.body.sender_id,
          avatar: data.body.sender_avatar,
        },
        isRead: data.body.is_read === "true",
        sentDate: new Date(data.body.created_at),
      };

      if (cachedMessages === undefined) {
        const newChat = await chatService.openNewChatWithStaff(
          data.body.receiver_id
        );
        if (newChat) {
          handleOpenChat(newChat);
        }
        return;
      }

      queryClient.setQueryData(
        ["getChatMessages", data.body.chat_id],
        [...cachedMessages, newMessage]
      );
    },
  });
}
