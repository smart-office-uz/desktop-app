import type { IChat } from "@/core/entities/chat.entity";
import { useGetChatList } from "@/core/use-cases/chat/get-chat-list";
import { useOpenChat } from "@/core/use-cases/chat/open-chat";
import { ChatList } from "./chat-list";
import { ChatSidebarListItem } from "./chat-sidebar-list-item";

export function ChatSidebarList() {
  const chatListData = useGetChatList();

  const { handleOpenChat } = useOpenChat();

  function handleChatSelect(chat: IChat) {
    handleOpenChat(chat);
  }

  return (
    <aside className="w-full">
      <ul className="w-full">
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
    </aside>
  );
}
