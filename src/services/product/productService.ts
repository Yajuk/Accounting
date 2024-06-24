import { apiClient } from "@/config/apiClient";
interface IProductData {
  name: string;
  description: string;
  price: number;
  unit: "kg" | "gm" | "litre" | "ml" | "piece";
  image: string;
  category: string;
  brand: string;
}

const createProduct = async (data: IProductData) => {
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
