export interface IPaginationModel {
  page: number;
  pageSize: number;
}
export interface ISearchFilter {
  search?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  brand?: string;
}

export interface IProductPayload {
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
  data: IProductPayload[];
}
export interface IParams {
  search?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  brand?: string;
  page?: number;
  limit?: number;
}
