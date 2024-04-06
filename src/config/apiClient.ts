import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { error } from "console";

const BASE_URL = process.env.NEXT_PUBLIC_BRAND_URL;
import { ErrorResponse, SuccessResponse } from "@/utils/error/types";
import { errorHandler } from "@/utils/error/errorHandler";

const defaultHeaders = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
  "Content-Type": "application/json",
};

export const defaultAxios = axios.create({
  baseURL: BASE_URL,
});

/**
 * Send an API request
 * @param url The request URL
 * @param data The request data
 * @param method The request method
 * @param headers The request headers
 * @param noHeaders Whether to omit the default headers
 * @param rest The rest of the AxiosRequestConfig
 * @returns The response data
 */
export async function apiClient({
  url,
  data = {},
  method = "GET",
  headers = {},
  noHeaders = false,
  ...rest
}: {
  url: string;
  data?: Record<string, unknown>;
  method?: AxiosRequestConfig["method"];
  headers?: AxiosRequestConfig["headers"];
  noHeaders?: boolean;
} & Omit<AxiosRequestConfig, "url" | "method" | "data" | "headers">): Promise<
  AxiosResponse["data"] | null
> {
  const token = localStorage.getItem("AUTH_TOKEN");

  try {
    const res: AxiosResponse = await defaultAxios({
      method,
      url,
      headers: {
        ...(noHeaders ? {} : defaultHeaders),
        ...headers,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      data,
      ...rest,
    });

    if (res.data) {
      return res.data;
    }
  } catch (err: AxiosError | any) {
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        throw errorHandler({
          status: "fail",
          statusCode: err.code || 400,
          errors: {
            message: "Internal Server Error",
          },
        } as ErrorResponse);
      }
      throw errorHandler(err.response?.data as ErrorResponse);
    }
    throw errorHandler(err.response.data);
  }
}
