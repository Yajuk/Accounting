import { apiClient } from "@/config/apiClient";
import { errorHandler } from "@/utils/error/errorHandler";
import { ErrorResponse, SuccessResponse } from "@/utils/error/types";

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
  user: any;
}

interface ISignInPayload {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: ISignInPayload) => {
  try {
    const response: SuccessResponse<ISignInResponse> = await apiClient({
      url: "/signin",
      method: "POST",
      data: {
        email,
        password,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
