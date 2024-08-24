import axiosInstance from "@/config/axiosConfig";
import chatRoutes from "../endpoints/chatEndpoints";
import { IMessage, IParticipant } from "@/types";

export const sendMessage = async (formData: FormData): Promise<IMessage> => {
  try {
    const response = await axiosInstance.post(chatRoutes.sendMessage, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    const response = await axiosInstance.get(
      `${chatRoutes.getMessages}/${conversationId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createConversation = async (
  participants: IParticipant[],
  isGroup: boolean,
  groupName?: string
) => {
  try {
    const response = await axiosInstance.post(chatRoutes.createConversation, {
      participants,
      isGroup,
      groupName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConversations = async (userId: string) => {
  try {
    const response = await axiosInstance.get(
      `${chatRoutes.getConversations}/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(chatRoutes.getUsers);
    return response.data;
  } catch (error) {
    throw error;
  }
};
