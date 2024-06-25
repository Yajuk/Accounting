"use client";
import DataTable from "@/components/ui/DataTable/DataTable";
import * as ProductService from "@/services/product/productService";
import { debounce } from "@/utils/debounce";
import { GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState<ProductService.IProductData[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const resp = await ProductService.getProducts({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search: search,
      });

      if (resp.statusCode === 200) {
        setProducts(resp.data.data);
        setTotalCount(resp.data.totalCount);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [paginationModel.page, paginationModel.pageSize, search]);

  const columns: GridColDef[] = [
    // { field: "_id", headerName: "ID", width: 120, type: "string" },
    { field: "name", headerName: "Name", width: 150, type: "string" },
    {
      field: "brand",
      headerName: "Brand",
      width: 150,
      type: "string",
      valueGetter: (value) => {
        return value.name;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      type: "string",
      valueGetter: (value) => {
        return value.name;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      type: "string",
    },
    { field: "price", headerName: "Price", width: 100, type: "number" },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      type: "string",
      valueFormatter: (value) => {
        return new Date(value).toLocaleString();
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,
      type: "string",
    },
  ];

  const rowCountRef = useRef(totalCount || 0);

  const rowCount = useMemo(() => {
    if (totalCount !== undefined) {
      rowCountRef.current = totalCount;
    }
    return rowCountRef.current;
  }, [totalCount]);

  const onSearchChange = useCallback((search: string) => {
    setSearch(search);
  }, []);
  const debouncedSearch = debounce(onSearchChange, 300);
  const onFilterChange = useCallback((filterModel) => {
    if (filterModel.quickFilterValues.length > 0) {
      debouncedSearch(filterModel.quickFilterValues[0]);
    }
  }, []);

  return (
    <DataTable
      getRowId={(row) => row._id}
      columns={columns}
      rows={products}
      rowCount={rowCount}
      loading={isLoading}
      filterMode="server"
      pageSizeOptions={[10, 20, 50]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      onFilterModelChange={onFilterChange}
    />
  );
};

export default ProductList;
