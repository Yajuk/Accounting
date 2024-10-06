import { apiClient } from "@/config/apiClient";
import {
  IPurchaseVoucher,
  IVoucherNumberPayload,
} from "@/utils/types/voucherTypes";

import {
  IParams,
  IProductPayload,
  IProductList,
} from "@/utils/types/voucherTypes";
import { SuccessResponse } from "@/utils/error/types";

export const nextVoucherNumber = async (data: IVoucherNumberPayload) => {
  try {
    const response = await apiClient({
      url: "/voucherNumbers",
      method: "POST",
      data: { ...data },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createVoucher = async (data: IPurchaseVoucher) => {
  try {
    const response = await apiClient({
      url: "/vouchers",
      method: "POST",
      data: { ...data },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getVouchers1 = async () => {
  try {
    const response = await apiClient({
      url: `/vouchers`,
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getVouchers = async (params?: IParams) => {
  try {
    const response: SuccessResponse<IProductList> = await apiClient({
      url: "/vouchers",
      method: "GET",
      params: params,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getVoucherById = async (id: string) => {
  console.log("id", id);
  try {
    const response: SuccessResponse<any> = await apiClient({
      url: `/vouchers/${id}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
