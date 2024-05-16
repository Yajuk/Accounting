import { apiClient } from "@/config/apiClient";
import { ApiResponse } from "@/utils/error/types";
import { send } from "process";

export interface Message {
  sender: {
    _id: string;
    name: string;
    email: string;
  };
  content: string;
  chat: string;
  createdAt?: string;
  updatedAt?: string;
}

const sendMessage = async (data: Message) => {
  try {
    const response: ApiResponse<Message> = await apiClient({
      url: "/chats/message",
      method: "POST",
      data: {
        ...data,
        sender: data.sender._id,
        chatId: data.chat,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getChatMessages = async (chatId: string) => {
  try {
    const response: ApiResponse<Message[]> = await apiClient({
      url: `/chats/message/${chatId}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export { sendMessage, getChatMessages };
