// components/ProductList.tsx
"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { Box, Card } from "@mui/material";
import { GridToolbar, GridFilterModel } from "@mui/x-data-grid";
import DataTable from "@/components/ui/DataTable/DataTable";

import { IPaginationModel, ISearchFilter } from "@/utils/types/productTypes";
import { debounce } from "@/utils/debounce";
import { columns, styles } from "@/config/productTableConfig";
import SearchFilter from "./SearchFilters";
import useProducts from "@/hooks/useProducts";

const ProductList = () => {
  const [paginationModel, setPaginationModel] = useState<IPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [search, setSearch] = useState<string>("");
  const [searchFilters, setSearchFilters] = useState<ISearchFilter>({});
  const { products, totalCount, isLoading } = useProducts(
    paginationModel,
    search,
    searchFilters,
  );

  const rowCountRef = useRef<number>(totalCount || 0);
  const rowCount = useMemo<number>(() => {
    if (totalCount !== undefined) {
      rowCountRef.current = totalCount;
    }
    return rowCountRef.current;
  }, [totalCount]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 300),
    [],
  );

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    if (filterModel?.quickFilterValues) {
      setSearch(filterModel.quickFilterValues[0]);
    }
  }, []);

  const onSearchFilterChange = useCallback((newFilters: ISearchFilter) => {
    setSearchFilters(newFilters);
  }, []);

  return (
    <Card className="m-4 flex">
      <DataTable
        sx={styles}
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
        density="compact"
        disableColumnSorting
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              debounceMs: 300,
            },
            showExport: false,
          },
        }}
        onFilterModelChange={onFilterChange}
        autosizeOnMount
        autoHeight
        autosizeOptions={{
          includeOutliers: true,
          includeHeaders: true,
          outliersFactor: 1,
          expand: true,
        }}
      />
      <Box className="w-[20%] p-4">
        <SearchFilter onFilterChange={onSearchFilterChange} />
      </Box>
    </Card>
  );
};

export default ProductList;
