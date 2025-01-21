import { useGetChatList } from "@/core/use-cases/chat/get-chat-list";
import { ChatList } from "./chat-list";
import { ChatSidebarListItem } from "./chat-sidebar-list-item";

export function ChatSidebarList() {
  const chatListData = useGetChatList();

  return (
    <ul className="basis-64 bg-background rounded-lg">
      <ChatList
        chatList={chatListData.chatList}
        ChatItemDisplayer={({ chat }) => (
          <ChatSidebarListItem key={chat.id} chat={chat} />
        )}
      />
    </ul>
  );
}
