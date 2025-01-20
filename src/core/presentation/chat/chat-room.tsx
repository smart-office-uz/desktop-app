"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";
import { Button } from "@/app/components/button";
import { Card } from "@/app/components/card";
import { ScrollArea } from "@/app/components/scroll-area";
import { Textarea } from "@/app/components/textarea";
import { SendHorizontal } from "lucide-react";

export function ChatRoom() {
  return (
    <div className="flex-1 flex">
      {/* Contacts/Groups list */}
      <Card className="w-80 flex flex-col border-r rounded-none">
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <ChatListItem
              name="Test Group"
              avatar="/placeholder.svg"
              message="Latest message here..."
              isGroup
            />
            {/* Add more chat items here */}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="h-14 flex items-center px-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>GP</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">Test Group</h3>
              <p className="text-xs text-muted-foreground">3 members</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Xabar almashishni boshlash uchun suhbatni tanlang...
            </p>
          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              placeholder="Type a message..."
              className="min-h-[44px] max-h-[200px]"
            />
            <Button size="icon" className="h-[44px] w-[44px]">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ChatListItemProps {
  name: string;
  avatar: string;
  message: string;
  isGroup?: boolean;
}

function ChatListItem({ name, avatar, message, isGroup }: ChatListItemProps) {
  return (
    <Button
      variant="ghost"
      className="w-full flex items-start gap-3 p-3 h-auto"
    >
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>{isGroup ? "G" : name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 text-left">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground truncate">{message}</p>
      </div>
    </Button>
  );
}
