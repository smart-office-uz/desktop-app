export interface IChat {
  id: string;
  lastMessage: {
    id: string;
    type: "text" | "file" | "audio";
    content: string;
    sentDate: Date;
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
