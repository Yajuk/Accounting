import { apiClient } from "@/config/apiClient";

interface ICategoryPayload {
  name: string;
  description: string;
}

export const createCategory = async (data: ICategoryPayload) => {
  try {
    const response = await apiClient({
      url: "/categories",
      method: "POST",
      data: { ...data },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient({
      url: "/categories",
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
