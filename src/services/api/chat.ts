import axios from "axios";
import chatRoutes from "../endpoints/chatEndpoints";
import { IMessage, IParticipant } from "@/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const chatApi = axios.create({
  baseURL: `${BASE_URL}/`,
  withCredentials: true,
});

export const sendMessage = async (
  message: Omit<IMessage, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const response = await chatApi.post(chatRoutes.sendMessage, message);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    const response = await chatApi.get(
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
    const response = await chatApi.post(chatRoutes.createConversation, {
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
    const response = await chatApi.get(
      `${chatRoutes.getConversations}/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const response = await chatApi.get(chatRoutes.getUsers);
    return response.data;
  } catch (error) {
    throw error;
  }
};
