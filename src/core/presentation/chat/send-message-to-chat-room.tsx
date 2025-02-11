import { Button } from "@/app/components/button";
import { Textarea } from "@/app/components/textarea";
import { IChat } from "@/core/entities/chat.entity";
import { useSendMessageToChat } from "@/core/use-cases/chat/send-message-to-chat";
import { SendHorizontal } from "lucide-react";
import { useRef } from "react";

interface Props {
  chat?: IChat;
}

export function SendMessageToChatRoom({ chat }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { handleSendMessage, isSending } = useSendMessageToChat(chat!);

  function handleSubmit() {
    if (!textAreaRef.current) return;

    const value = textAreaRef.current.value;

    handleSendMessage({
      textContent: value,
    });
  }

  return (
    <div className="p-4 border-t">
      <form
        className="flex gap-6"
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit();
          evt.currentTarget.reset();
        }}
      >
        <Textarea
          ref={textAreaRef}
          placeholder="Type a message..."
          className="max-h-[200px] rounded-2xl"
        />
        <Button className="min-w-20 rounded-full" disabled={isSending}>
          <SendHorizontal className="w-6 h-6" />
        </Button>
      </form>
    </div>
  );
}
