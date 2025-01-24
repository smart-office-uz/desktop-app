export interface IChat {
  id: string;
  lastMessage?: {
    id?: string;
    type?: "text" | "file" | "audio";
    content?: string;
    sentDate?: Date;
    updateId?: number;
  };
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  createdDate: Date;
  type: "PRIVATE" | "GROUP";
  owner?: {
    id: string;
  };
}

export interface IChatMessage {
  id: string;
  content: string;
  sentDate: Date;
  senderUser: {
    id: string;
    avatar?: string;
  };
  receiverUser: {
    id?: string;
    avatar?: string;
  };
  isRead: boolean;
  reply?: Omit<IChatMessage, "reply">;
}
