import { apiClient } from "@/config/apiClient";
import { SuccessResponse } from "@/utils/error/types";
import {
  IParams,
  IProductPayload,
  IProductList,
} from "@/utils/types/productTypes";

export const createProduct = async (data: IProductPayload) => {
  try {
    const response = await apiClient({
      url: "/products",
      method: "POST",
      data: { ...data },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProductById = async (id: string, data: IProductPayload) => {
  try {
    const response = await apiClient({
      url: `/products/${id}`,
      method: "PUT",
      data: { ...data },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (params?: IParams) => {
  try {
    const response: SuccessResponse<IProductList> = await apiClient({
      url: "/products",
      method: "GET",
      params: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response: SuccessResponse<IProductPayload> = await apiClient({
      url: `/products/${id}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
