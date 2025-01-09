export interface IChat {
  id: string;
  lastMessage: {
    id: string;
    messageType: "text" | "file" | "audio";
    content: string;
    sentAt: Date;
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
