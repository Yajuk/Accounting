import { apiClient } from "@/config/apiClient";

interface IBrandPayload {
  name: string;
  description: string;
}

export const createBrand = async (payload: IBrandPayload) => {
  try {
    const response = await apiClient({
      url: "/brands",
      method: "POST",
      data: { ...payload },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBrands = async () => {
  try {
    const response = await apiClient({
      url: "/brands",
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
