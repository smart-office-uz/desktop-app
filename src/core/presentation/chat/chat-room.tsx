import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";
import { ScrollArea } from "@/app/components/scroll-area";
import { IChat, IChatMessage } from "@/core/entities/chat.entity";
import { Await } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { ChatMessageItem } from "./message-item";
import { MessageList } from "./message-list";
import { SendMessageToChatRoom } from "./send-message-to-chat-room";

interface Props {
  chat?: IChat;
  messages: IChatMessage[];
  currentUserId: Promise<string>;
}

export function ChatRoom(props: Props) {
  const { chat, messages, currentUserId } = props;

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center p-3 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>GP</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{chat?.name.uz}</h3>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 max-h-[600px]">
        <div className="space-y-3">
          <Await
            promise={currentUserId}
            fallback={
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            }
          >
            {(currentUserId) => (
              <MessageList
                messages={messages}
                MessagePresenter={({ message }) => (
                  <ChatMessageItem
                    currentUserId={currentUserId}
                    message={message}
                  />
                )}
              />
            )}
          </Await>
        </div>
      </ScrollArea>

      <SendMessageToChatRoom chat={chat} />
    </div>
  );
}
