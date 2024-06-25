import { apiClient } from "@/config/apiClient";
import { SuccessResponse } from "@/utils/error/types";
export interface IProductData {
  name: string;
  description: string;
  price: number | string;
  unit: "kg" | "gm" | "litre" | "ml" | "piece";
  image: string;
  category: string;
  brand: string;
}
export interface IProductList {
  currentPage: number;
  nextPage: number | null;
  totalPages: number;
  data: IProductData[];
}
export interface IParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const createProduct = async (data: IProductData) => {
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
