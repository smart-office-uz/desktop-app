import { IChatStaff } from "@/core/entities/chat-staff.entity";
import { chatService } from "@/core/services/chat.service";
import { useChatStore } from "@/store/chat/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOpenChat } from "./open-chat";

export function useStartNewChatWithStaff() {
  const queryClient = useQueryClient();

  const { handleOpenChat } = useOpenChat();
  const { setIsStaffDialogOpen } = useChatStore();

  const newChatMutation = useMutation({
    mutationKey: ["newChatWithStaff"],
    mutationFn: async function (receiverId: string) {
      const newChat = await chatService.createNew({
        receiverId,
      });

      handleOpenChat(newChat.id);
    },
    onSuccess() {
      setIsStaffDialogOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["getChatList"],
      });
    },
  });

  async function handleStartNewChat(staff: IChatStaff) {
    await newChatMutation.mutateAsync(staff.identifier);
  }

  return {
    handleStartNewChat,
    isCreatingNewChat: newChatMutation.isPending,
    isError: newChatMutation.isError,
  };
}
