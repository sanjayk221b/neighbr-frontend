

export interface IParticipant {
  id: string;
  type: "resident" | "caretaker" | "admin";
  name: string;
}

export interface IConversation {
  _id: string;
  participants: IParticipant[];
  isGroup: boolean;
  groupName?: string;
  groupAdmins?: string[];
  lastMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  id?: string;
  senderId: string;
  senderType: "resident" | "caretaker" | "admin";
  content: string;
  mediaType: "image" | "video" | "document" | "audio" | "none";
  mediaUrl?: string;
  conversationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IChatService {
  getConversations: (userId: string) => Promise<IConversation[]>;
  getMessages: (conversationId: string) => Promise<IMessage[]>;
  sendMessage: (message: IMessage) => Promise<IMessage>;
  createConversation: (
    participants: IParticipant[],
    isGroup: boolean,
    groupName?: string
  ) => Promise<IConversation>;
}
