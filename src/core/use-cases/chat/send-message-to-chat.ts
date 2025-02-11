import { IChat } from "@/core/entities/chat.entity";
import { chatService } from "@/core/services/chat.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRefreshChatContent } from "./refresh-chat-content";

export function useSendMessageToChat(chat: IChat) {
  const refreshChatContent = useRefreshChatContent(chat);
  const mutation = useMutation({
    mutationKey: ["sendMessageToChat", chat?.id, chat?.type],
    mutationFn: async function (ctx: {
      uploadedFileId?: string;
      textContent?: string;
    }) {
      const { textContent, uploadedFileId } = ctx;

      return await chatService.sendMessage({
        chat,
        file_id: uploadedFileId,
        text: textContent,
      });
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success("Xabar yuborildi!");
      if (data) {
        refreshChatContent(data);
      }
    },
  });

  return {
    isSending: mutation.isPending,
    handleSendMessage: mutation.mutateAsync,
  };
}
