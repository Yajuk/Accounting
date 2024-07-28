// hooks/useProducts.ts
import * as ProductService from "@/services/product/productService";
import {
  IPaginationModel,
  IProductPayload,
  ISearchFilter,
} from "@/utils/types/productTypes";
import { useCallback, useEffect, useState } from "react";

const useProducts = (
  paginationModel: IPaginationModel,
  search: string,
  searchFilters?: ISearchFilter,
) => {
  const [products, setProducts] = useState<IProductPayload[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await ProductService.getProducts({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search: search || searchFilters?.search,
        category: searchFilters?.category,
        brand: searchFilters?.brand,
        startDate: searchFilters?.startDate,
        endDate: searchFilters?.endDate,
      });

      if (resp.statusCode === 200) {
        setProducts(resp.data.data);
        setTotalCount(resp.data.totalCount);
      } else {
        console.error(`Error fetching products: ${resp.statusCode}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [paginationModel, search, searchFilters]);

  const reFetchProducts = () => {
    getProducts();
  };
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return { products, totalCount, isLoading, reFetchProducts };
};

export default useProducts;
