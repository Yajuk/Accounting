import { apiClient } from "@/config/apiClient";
import { errorHandler } from "@/utils/error/errorHandler";
import { ErrorResponse, ApiResponse, Pagination } from "@/utils/error/types";

export interface Chat {
  _id: string;
  name: string;
  creator: string;
  type: string;
  messages: any[]; // You can define a type for messages if needed
  participants: string[];
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
