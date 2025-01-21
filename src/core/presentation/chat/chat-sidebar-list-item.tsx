import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/card";
import type { IChat } from "@/core/entities/chat.entity";

interface Props {
  chat: IChat;
}

export function ChatSidebarListItem(props: Props) {
  const { chat } = props;

  return (
    <li className="w-full">
      <Card className="bg-transparent hover:bg-secondary rounded-none border-none cursor-pointer transition-colors">
        <CardHeader className="py-2 px-3">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage
                src={"https://smart-office.uz/media/store/img/group-users.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <CardTitle className="text-xl font-medium">{chat.name.uz}</CardTitle>
              <CardDescription className="">{chat.lastMessage.content}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </li>
  );
}
