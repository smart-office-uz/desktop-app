import type { IChatMessage } from "@/core/entities/chat.entity";

interface MessagePresenterProps {
  message: IChatMessage;
}

interface Props {
  messages: IChatMessage[];
  MessagePresenter<T extends MessagePresenterProps>(props: T): JSX.Element;
}

export function MessageList(props: Props) {
  return props.messages.map((message) => (
    <props.MessagePresenter message={message} key={message.id} />
  ));
}
