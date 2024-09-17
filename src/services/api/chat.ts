import axiosInstance from "@/config/axiosConfig";
import chatRoutes from "../endpoints/chatEndpoints";
import { IMessage, IParticipant } from "@/types";

export const sendMessage = async (formData: FormData): Promise<IMessage> => {
  const response = await axiosInstance.post(chatRoutes.sendMessage, formData);
  return response.data;
};

export const getMessages = async (conversationId: string) => {
  const response = await axiosInstance.get(
    `${chatRoutes.getMessages}/${conversationId}`
  );
  return response.data;
};

export const createConversation = async (
  participants: IParticipant[],
  isGroup: boolean,
  groupName?: string
) => {
  const response = await axiosInstance.post(chatRoutes.createConversation, {
    participants,
    isGroup,
    groupName,
  });
  return response.data;
};

export const getConversations = async (userId: string) => {
  const response = await axiosInstance.get(
    `${chatRoutes.getConversations}/${userId}`
  );
  return response.data;
};

export const getUsers = async () => {
  const response = await axiosInstance.get(chatRoutes.getUsers);
  return response.data;
};
