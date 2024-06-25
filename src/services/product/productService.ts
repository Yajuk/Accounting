import { apiClient } from "@/config/apiClient";
interface IProductData {
  name: string;
  description: string;
  price: number | string;
  unit: "kg" | "gm" | "litre" | "ml" | "piece";
  image: string;
  category: string;
  brand: string;
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
