import { apiClient } from "@/config/apiClient";
import {
  IPurchaseVoucher,
  IVoucherNumberPayload,
} from "@/utils/types/voucherTypes";

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
