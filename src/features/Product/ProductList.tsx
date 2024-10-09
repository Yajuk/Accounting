// components/ProductList.tsx
"use client";
import DataTable from "@/components/ui/DataTable/DataTable";
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import ProductDetails from "./ProductDropdown/ProductDetails";
import GenericTable from "@/components/ui/GenericTable/GenericTable";

const ProductList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

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
  const [showDetails, setShowDetails] = useState(false);
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
    setShowDetails(false);
    handleClose();
  };

  const handleEditClick = (row: Record<string, any>) => {
    setCurrentEditRecord(row);
    setShowDetails(false);
    handleOpen();
  };

  const handleDetailsClick = (row: Record<string, any>) => {
    setCurrentEditRecord(row);
    setShowDetails(true);
    handleOpen();
  };

  const handlePageChange = (newPage) => {
    console.log("New page:", newPage);
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    console.log("New rows per page:", newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const renderDetailPanel = (row) => <ProductDetails product={row} />;

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
    // Handle row click
  };
  const handleSelectionChange = (selectedIds: string[]) => {
    console.log("Selected IDs:", selectedIds);
    // Handle selection change
  };

  return (
    <Box className="m-4 flex flex-col lg:flex-row gap-4">
      <Card className="flex-grow">
        <Box className="p-4">
          <Typography variant="h5" className="mb-4">
            Product List
          </Typography>
          <GenericTable
            columns={[
              ...columns,
              {
                key: "actions",
                label: "Actions",
                sticky: "right",
                filterable: false,
                width: 200,
                render: (value, row: Record<string, any>) => (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(row)}
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDetailsClick(row)}
                      size="small"
                    >
                      Details
                    </Button>
                  </Box>
                ),
              },
            ]}
            data={products}
            totalCount={totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            loading={isLoading}
            onRowClick={handleRowClick}
            onSelectionChange={handleSelectionChange}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            renderDetailPanel={renderDetailPanel}
            showEditAction={false}
          />
          {/* <DataTable
            sx={styles}
            getRowId={(row) => row._id}
            columns={[
              ...columns,
              {
                field: "actions",
                headerName: "Actions",
                width: 200,
                renderCell: (params: GridRenderCellParams) => (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(params.row)}
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDetailsClick(params.row)}
                      size="small"
                    >
                      Details
                    </Button>
                  </Box>
                ),
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
                quickFilterProps: { debounceMs: 300 },
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
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
          /> */}
        </Box>
      </Card>
      <Card className={`${isMobile ? "w-full" : "w-[300px]"} p-4`}>
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
      </Card>
      <MuiModal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          {!showDetails && (
            <CreateProductForm
              productId={currentEditRecord?._id}
              onSuccess={onSuccess}
            />
          )}
          {showDetails && currentEditRecord && (
            <ProductDetails product={currentEditRecord} />
          )}
        </Box>
      </MuiModal>
    </Box>
  );
};

export default ProductList;
