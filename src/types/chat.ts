export interface IParticipant {
  _id: string;
  type: "resident" | "caretaker";
  name?: string;
  image?: string;
}

export interface IConversation {
  _id: string;
  participants: IParticipant[];
  isGroup: boolean;
  groupName?: string;
  groupAdmins?: string[];
  lastMessage?: IMessage;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  _id?: string;
  senderId: string;
  senderType: "resident" | "caretaker" | "admin";
  content: string;
  mediaType: "image" | "document" | "audio" | "none";
  mediaUrl?: string;
  conversationId: string;
  createdAt: Date;
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
