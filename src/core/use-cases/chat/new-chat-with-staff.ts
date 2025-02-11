import { IChatStaff } from "@/core/entities/chat-staff.entity";
import { chatService } from "@/core/services/chat.service";
import { useChatStore } from "@/store/chat/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useOpenChat } from "./open-chat";

export function useOpenNewChatWithStaff() {
  const queryClient = useQueryClient();

  const { handleOpenChat } = useOpenChat();
  const { setIsStaffDialogOpen } = useChatStore();

  const newChatMutation = useMutation({
    mutationKey: ["newChatWithStaff"],
    mutationFn: async function (staffId: IChatStaff["identifier"]) {
      const newChat = await chatService.openNewChatWithStaff(staffId);

      if (newChat) {
        handleOpenChat(newChat);
      }

      return newChat;
    },
    onSuccess(data) {
      setIsStaffDialogOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["getChatList"],
      });
      if (data !== undefined) {
        queryClient.setQueryData(["getChatById", data?.id], data);
      }
    },
    onError(error) {
      toast.error(error.message, {
        important: true,
        closeButton: true,
        position: "top-right",
      });
    },
  });

  return {
    handleStartNewChat: newChatMutation.mutateAsync,
    isCreatingNewChat: newChatMutation.isPending,
    isError: newChatMutation.isError,
  };
}
