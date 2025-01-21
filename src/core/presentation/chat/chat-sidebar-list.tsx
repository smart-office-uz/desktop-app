import { IChat } from "@/core/entities/chat.entity";
import { useGetChatList } from "@/core/use-cases/chat/get-chat-list";
import { ChatList } from "./chat-list";
import { ChatSidebarListItem } from "./chat-sidebar-list-item";

export function ChatSidebarList() {
  const chatListData = useGetChatList();

  function handleChatSelect(chat: IChat) {
    alert(chat.id);
  }

  return (
    <ul className="basis-64 bg-background rounded-lg">
      <ChatList
        chatList={chatListData.chatList}
        ChatItemDisplayer={({ chat }) => (
          <ChatSidebarListItem
            handleChatSelect={handleChatSelect}
            key={chat.id}
            chat={chat}
          />
        )}
      />
    </ul>
  );
}
