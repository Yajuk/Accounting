// components/ProductList.tsx
"use client";
import DataTable from "@/components/ui/DataTable/DataTable";
import { Box, Button, Card, Divider } from "@mui/material";
import {
  GridFilterModel,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useCallback, useMemo, useRef, useState } from "react";

import MuiModal, { useModal } from "@/components/ui/FormTextField/MuiModal";
import { columns, styles } from "@/config/productTableConfig";
import useProducts from "@/hooks/useProducts";
import { debounce } from "@/utils/debounce";
import { IPaginationModel, ISearchFilter } from "@/utils/types/productTypes";
import CreateProductForm from "./ProductDropdown/ProductCreate";
import SearchFilter from "./SearchFilters";

const ProductList = () => {
  const [paginationModel, setPaginationModel] = useState<IPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const { handleOpen, handleClose, open } = useModal();

  const [search, setSearch] = useState<string>("");
  const [searchFilters, setSearchFilters] = useState<ISearchFilter>({});
  const { products, totalCount, isLoading, reFetchProducts } = useProducts(
    paginationModel,
    search,
    searchFilters,
  );
  const [currentEditRecord, setCurrentEditRecord] = useState<
    Record<string, any> | undefined
  >(undefined);
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

  const onSuccess = useCallback(() => {
    handleClose();
    setCurrentEditRecord(undefined);
    reFetchProducts();
  }, []);

  const handleCloseModal = () => {
    setCurrentEditRecord(undefined);
    handleClose();
  };
  return (
    <Card className="m-4 flex">
      <DataTable
        sx={styles}
        getRowId={(row) => row._id}
        columns={[
          ...columns,
          {
            field: "actions",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) => {
              return (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setCurrentEditRecord(params.row);
                      handleOpen();
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              );
            },
          },
        ]}
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
      <Card className="w-[20%] p-4 m-4 min-w-12">
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          fullWidth
          onClick={handleOpen}
        >
          Create Product
        </Button>
        <Divider sx={{ mb: 2 }}>Filters</Divider>
        <SearchFilter onFilterChange={onSearchFilterChange} />
        {open && (
          <MuiModal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              <CreateProductForm
                productId={currentEditRecord?._id}
                onSuccess={onSuccess}
              />
            </Box>
          </MuiModal>
        )}
      </Card>
    </Card>
  );
};

export default ProductList;
