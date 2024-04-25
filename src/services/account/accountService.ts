import { apiClient } from "@/config/apiClient";
import { errorHandler } from "@/utils/error/errorHandler";
import { ErrorResponse, SuccessResponse } from "@/utils/error/types";

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface IUserList {
  currentPage: number;
  nextPage: number | null;
  totalPages: number;
  data: IUser[];
}
export interface IParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const getUsers = async (params?: IParams) => {
  try {
    const response: SuccessResponse<IUserList> = await apiClient({
      url: "/users",
      method: "GET",
      params: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
