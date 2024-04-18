import { apiClient } from "@/config/apiClient";
import { errorHandler } from "@/utils/error/errorHandler";
import { ErrorResponse, SuccessResponse } from "@/utils/error/types";

type ISignInResponse = [
  {
    _id: string;
    name: string;
    email: string;
  },
];

export const getUsers = async () => {
  try {
    const response: SuccessResponse<ISignInResponse> = await apiClient({
      url: "/users",
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
