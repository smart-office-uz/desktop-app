import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";
import { Button } from "@/app/components/button";
import { ScrollArea } from "@/app/components/scroll-area";
import { Textarea } from "@/app/components/textarea";
import { IChat } from "@/core/entities/chat.entity";
import { SendHorizontal } from "lucide-react";

interface Props {
  chat: IChat;
}

export function ChatRoom(props: Props) {
  const { chat } = props;

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
            <h3 className="font-medium">{chat.name.uz}</h3>
            <p className="text-xs text-muted-foreground">3 members</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        
      </ScrollArea>

      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex gap-6">
          <Textarea
            placeholder="Type a message..."
            className="max-h-[200px] rounded-2xl"
          />
          <Button className="min-w-20 rounded-full">
            <SendHorizontal className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
