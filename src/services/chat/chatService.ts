import { apiClient } from "@/config/apiClient";
import { ApiResponse } from "@/utils/error/types";

export interface UserDocument {
  name: string;
  id: string;
  email: {
    type: string;
    required: true;
    unique: [true, "This Email is already taken"];
  };
  password: string;
  roles: string[];
}

export interface Chat {
  _id: string;
  name: string;
  creator: string;
  type: string;
  messages: any[]; // You can define a type for messages if needed
  participants: string[] | UserDocument[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatList {
  currentPage: number;
  nextPage: number | null;
  totalPages: number;
  data: Chat[];
}

interface IParams {
  search?: string;
  page?: number;
  limit?: number;
}

const chatList = async (params?: IParams) => {
  try {
    const response: ApiResponse<ChatList> = await apiClient({
      url: "/chats",
      method: "GET",
      params: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const CHAT_TYPES = {
  PRIVATE: "private",
  GROUP: "group",
};

interface IPayload {
  name: string;
  participants: string[];
  type: "private" | "group";
}
const createChat = async (data: IPayload) => {
  try {
    const response: ApiResponse<Chat> = await apiClient({
      url: "/chats",
      method: "POST",
      data: {
        ...data,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export { createChat, chatList };
