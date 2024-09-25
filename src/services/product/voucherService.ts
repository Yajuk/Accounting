import { apiClient } from "@/config/apiClient";

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
