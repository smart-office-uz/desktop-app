import type { IChat } from "@/core/entities/chat.entity";

interface ChatItemDisplayerProps {
  chat: IChat;
}

interface Props {
  chatList: IChat[];
  ChatItemDisplayer<T extends ChatItemDisplayerProps>(props: T): JSX.Element;
}

export function ChatList(props: Props) {
  const { chatList, ChatItemDisplayer } = props;

  return chatList.map((chat) => <ChatItemDisplayer key={chat.id} chat={chat} />);
}
